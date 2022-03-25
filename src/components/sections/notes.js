import React, { useEffect, useState }from 'react';
import { useMediaQuery } from 'react-responsive';
import { statusIcons }  from '../../constants/defaults';
import { profileSchema } from '../../constants/schemas';
import _ from 'lodash';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { 
        Row,
        Col,
        Modal
    } from 'antd';
import SpaceSuit from '../spaceSuit';
import Pane from '../pane';
import UserAvatar from '../userAvatar';
import { modalFromLocation, stubFromSearch } from '../../utils/navigation';
import { userProfile } from '../../services/user';
import Lock from '../icons/lock';
import Unlock from '../icons/unlock';
import ModalEditField from '../modalEditField';
import ModalEditAvatar from  '../modalEditAvatar';
import { EditOutlined } from '@ant-design/icons';

const StyledP = styled.p`
    display:block;
    color: white;
    font-size: 2vh;
    line-height: 2.5vh;
    margin: 1vh 1.25vh;
    font-family: Roboto, sans-serif;
    font-weight: 100;
`;

const Styledlabel = styled.span`
    font-family: Orbitron, sans-serif;
    display: inline-block;
    min-width: 10vh;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 2vh;
    color: #00b8ff;
`;
const StyledValue = styled.span`
    display: inline-block;
    width: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const StyledBlurb = styled.span`
    margin-left: 1.5vh;
    display: block;
`;

const MiniIconBtn = styled.div`
    cursor: pointer;
    fill: #fff;
    svg {
        opacity: 0.5;
    }
`;

const EditBtnHolder = styled.div`
    position: absolute;
    bottom: 1.75vh;
    right: 2vh;
`;

const StyledCol = styled(Col)`
    ${StyledP} {
        cursor: ${props => props.locked ? 'inherit' : 'pointer'};
    }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background:transparent;
    box-shadow: none;
    color: #fff;
  }
  .ant-modal-close-x {
    margin-top: -50px;
    color:#ff00a0;
    filter: drop-shadow(0 0 8px #ff00a0);
  }
  .ant-modal-footer {
    border: 0;
    padding: 0;
    filter: drop-shadow(0px 0px 5px #00b8ff);
    &:hover {
        filter: drop-shadow(0px 0px 10px #00b8ff);
    }
  }
  .ant-btn {
    clip-path: polygon(0% 15%, 15% 7%, 15% 0%, 85% 0%, 85% 7%, 100% 15%, 100% 85%, 85% 93%, 85% 100%, 15% 100%, 15% 93%, 0% 85%);
    color: #fff;
    background-color: #120458;
    border: 0;
    width: 20vh;
    }
    .ant-btn-primary {
        background-color: #00b8ff;
    }
    .ant-form-item-label {
        label {
            color: #fff;
            font-size: 3vh;
        }
    }
`;


export default function Notes({ location }) {
    const [profileData, setProfile] = useState({});
    const [locked, setLock] = useState(true);
    const userId = _.get(profileData, 'auth.userid', '----------');
    const firstname = _.get(profileData, 'profile.firstname', 'N/A');
    const lastname = _.get(profileData, 'profile.lastname', 'N/A');
    const username = _.get(profileData, 'profile.username', 'N/A');
    const status = _.get(profileData, 'profile.status', 'Available');
    const occupation = _.get(profileData, 'profile.occupation', 'N/A');
    const skills = _.get(profileData, 'profile.skills', 'N/A');
    const bio = _.get(profileData, 'profile.bio', 'N/A');
    const avatar =_.get(profileData, 'profile.avatar', null);
    const defaultModal = modalFromLocation(location);
    const [modal, setModal] = useState(defaultModal);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

    const closeModal = () => {
        setModal(null);
        navigate('/?p=profile');
    }

    const getProfile = async () => {
        const response = userProfile();
        return await response;
    };

    const toggleLock = () => {
        setLock(!locked);
    };

    const setProfileObjKey = objKey => {
        navigate(`/?p=profile&k=${objKey}#editField`);
    };

    const changeAvatar = () => {
        navigate(`/?p=profile&#editAvatar`);
    };

    useEffect(() => {
        getProfile().then(res => {
            res.data.profile = _.get(res, 'data.profile', false) ? res.data.profile : profileSchema;
            setProfile(res.data);
            localStorage.setItem('profileData', JSON.stringify(res.data));
        }).catch(err => {
            console.log('err', err);
        });
        setModal(modalFromLocation(location));
    }, [location]);

    const userStub = <>Notes</>;
    const EBtn = ({ style }) => (!locked && <EditOutlined style={{...style, ...{cursor: 'pointer', opacity: 0.6}}}/>);


  return (
    <SpaceSuit>
        <Pane
            title={userStub}
            back={'/#userSettings'}
            offset={isTabletOrMobile ? '128' : '160'}
            footer={
                <MiniIconBtn style={{width:'40px', right:'16px'}} onClick={toggleLock}>
                </MiniIconBtn>
            }
        >
        </Pane>
        <StyledModal
            title={null}
            visible={modal}
            closable={false}
            footer={null}
            onCancel={closeModal}
            bodyStyle={{padding:0, background:'transparent'}}
            width="75vh"
            >
            <Pane frameId={1}>
                {modal === 'editField' && <ModalEditField fieldKey={stubFromSearch(location, 'k')} />}
                {modal === 'editAvatar' && <ModalEditAvatar />}
            </Pane>
        </StyledModal>
    </SpaceSuit>
  )
}