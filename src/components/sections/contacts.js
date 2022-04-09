import React, { useEffect, useState }from 'react';
import { useMediaQuery } from 'react-responsive';
import { useWindowDimensions } from '../../utils/responsive';
import _ from 'lodash';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { 
        Row,
        Col,
        Modal,
    } from 'antd';
import SpaceSuit from '../spaceSuit';
import Pane from '../pane';
import IdActions from '../idActions';
import { colors } from '../../constants/defaults';
import { getFriends, makeFriend } from '../../services/user';
import { modalFromLocation } from '../../utils/navigation';
import { UserAddOutlined, EyeInvisibleTwoTone} from '@ant-design/icons';
import { statusIcons }  from '../../constants/defaults';

const {primaryCyan, primaryIndigo, primaryMagenta, primaryColor } = colors;

const StyledP = styled.p`
    display:block;
    color: white;
    font-size: 2vh;
    line-height: 2.5vh;
    margin: 1vh 1.25vh;
    font-family: Roboto, sans-serif;
    font-weight: 100;
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

const Wrapper = styled.div`
    height: calc(${props => props.height}px - ${props => props.offset}px);
    margin: 0 auto;
    overflow: auto;
`;

const Contact =  styled.div`
display:block;
position: absolute;
z-index: 10;
text-align: left;
font-size: 1rem;
padding: 6px 20px;
margin: 10px 16px;
max-width: 75vw;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
color: ${primaryColor};
cursor: pointer;
&.pitch-mixin {
    --aug-inlay: initial;
    --aug-inlay-all: 3px;
    --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryCyan},  rgba(122, 4, 235, .5))  50% 50% / 100% 100%;
    --aug-border-all: 3px;
    --aug-border-bg: radial-gradient(${primaryMagenta}, ${primaryCyan}) 100% 100% / 100% 100%;
    color: ${primaryColor};
}
span {
    color: ${primaryColor};
    padding: 0;
    margin: 0;
    filter: drop-shadow(0 0 5px ${primaryColor});
    white-space: nowrap;
    & span {
        font-weight: 200;
        opacity: .5;
    }
}
`;

export default function Contacts({ location }) {
    const userStub = <>Contacts</>;
    const viewport = useWindowDimensions();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const totalOffset = isTabletOrMobile ? 236 : 276;
    const defaultModal = modalFromLocation(location);
    const [modal, setModal] = useState(defaultModal);
    const [contacts, setChatContacts] = useState([]);
    

    const closeModal = () => {
        setModal(null);
        navigate('/?p=contacts');
    }

    const fetchFriends = async () => {
        const response = getFriends();
        return await response;
    };

    const addFriendByID = id => {
        makeFriend(id);
        navigate(`/?p=contacts&id=${id}`);
    }
    
    const getIDCard = id => {
        navigate(`/?p=identification&f=y&id=${id}`);
    }

    useEffect(() => {
        fetchFriends().then(res => {
            const myContacts = res.data;
            setChatContacts(myContacts);
        }).catch(err => {
            console.log('err', err);
        });
        setModal(modalFromLocation(location));
      }, [location]);

  return (
    <SpaceSuit>
        <Pane
            title={userStub}
            back={'/'}
            offset={isTabletOrMobile ? '128' : '160'}
            footer={
                <IdActions title="Add User to Friends List" successHandler={addFriendByID} icon={<UserAddOutlined />} />
            }
        >
        <Row justify="space-between" align="middle">
            <StyledCol span={24}>
                <Wrapper offset={totalOffset} height={viewport.height}>
                    {contacts && contacts.map(contact => (
                        <Contact
                            className='pitch-mixin'
                            data-augmented-ui="tr-round br-round bl-clip tl-round inlay"
                            key={`contact_${contact.id}`}
                            onClick={_.partial(getIDCard, contact.id)}
                        >
                            <span>{contact.status ? statusIcons[contact.status] : <EyeInvisibleTwoTone />} {contact.username && `${contact.username} ⇋ `}<span>[{contact.id}]</span></span>
                        </Contact>
                    ))}
                </Wrapper>
            </StyledCol>
        </Row>
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
                { 
                // modal goes here
                }
            </Pane>
        </StyledModal>
    </SpaceSuit>
  )
}
