import React, { useEffect, useState }from 'react';
import _ from 'lodash';
import queryString from 'query-string';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { QrReader } from 'react-qr-reader';
import { getUser } from '../../services/auth';
import { 
        Row,
        Col,
        Drawer,
        Typography,
    } from 'antd';
import SpaceSuit from '../spaceSuit';
import Pane from '../pane';
import FriendActions from '../friendActions';
import { viewFriend, viewIdentity } from '../../services/user';
import { colors } from '../../constants/defaults';
import { defaultImg } from '../../constants/defaultImg';

const { Title } = Typography;

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

const Wrapper = styled.div`
    max-width: 350px;
    margin: 0 auto;
`;

const PhotoWrapper = styled.div`
    width: 330px;
    height: 350px;
    padding: 4px;
    margin: 10px;
    background-image: url("${props => props.image ? props.image : defaultImg}");
    background-size: cover;
    overflow: hidden;
    filter: drop-shadow(0px 0px 6px ${primaryMagenta});
    .pitch-mixin {
      max-height: 250px;
      --aug-tr: 25px;
      --aug-b-extend1: 50%;
      --aug-border-all: 1px;
      --aug-border-bg: radial-gradient(${primaryMagenta}, ${primaryColor}) 100% 100% / 100% 100%;
      --aug-inlay-all: 4px;
      --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryMagenta}, transparent)  50% 50% / 100% 100%;
      --aug-inlay-opacity: 0.5;
    }
`;


const IdCard =  styled.div`
display:block;
position: relative;
text-align: left;
font-size: 1rem;
width: 100%
max-width: 350px;
min-height: 500px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
color: ${primaryColor};
cursor: pointer;
&.pitch-mixin {
    --aug-inlay: initial;
    --aug-inlay-all: 3px;
    --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryColor},  rgba(122, 4, 235, .5))  50% 50% / 100% 100%;
    --aug-border-all: 3px;
    --aug-border-bg: radial-gradient(${primaryColor}, ${primaryColor}) 100% 100% / 100% 100%;
    color: ${primaryColor};
}
`;

const UserName = styled.div`
    margin: 10px;
    text-indent: 10px;
    color: white;
    font-size: 24px;
    filter: drop-shadow(0px 0px 5px ${primaryIndigo});
    padding: 4px;
    &.pitch-mixin {
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, #41c5ff, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
        --aug-border-all: 2px;
        --aug-border-bg: radial-gradient(#fff, #41c5ff) 100% 100% / 100% 100%;
    }
`;

const Number = styled.div`
    position: absolute;
    bottom: 90px;
    left: 50%;
    width: 350px;
    text-align: center;
    margin-left: -50%;
    color: ${primaryCyan};
    font-size: 32px;
    filter: drop-shadow(0 0 5px ${primaryColor});
    white-space: nowrap;
    & span {
        font-weight: 200;
        opacity: .5;
    }
`;

const FullName = styled.div`
    width: 350px;
    text-align: center;
    color: ${primaryColor};
    font-size: 20px;
    filter: drop-shadow(0 0 5px ${primaryColor});
    white-space: nowrap;
    & span {
        font-weight: 200;
        opacity: .5;
    }
`;


const Deets = styled.div`
    p {
        margin: 1vh 1.25vh;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        font-weight: 500;
        white-space: normal;
    }
`;

const MiniTitle = styled(Title)`
    font-size: 18px;
    color: ${primaryCyan} !important;
    filter: drop-shadow(0 0 5px ${primaryColor});
`;

export default function Id({ location }) {
    const userStub = <>Identification</>;

    const nnUser = getUser();
    const userId = nnUser.userid;

    const params = queryString && queryString.parse(_.get(location, 'search', ''));
    const id = params && params.id;
    const f = params && params.f;

    const [identity, setIdentity] = useState({});
    const [isDrawer, setIsDrawer] = useState(false);

    const username = _.get(identity, 'username', 'N/A');
    const occupation = _.get(identity, 'occupation', 'N/A');
    const skills = _.get(identity, 'skills', 'N/A');
    const bio = _.get(identity, 'bio', 'N/A');
    const firstName = _.get(identity, 'firstname', 'N/A');
    const lastName = _.get(identity, 'lastname', null);
    const avatar =_.get(identity, 'avatar', null);

    const goToId = id => {
        navigate(`/?p=identification&id=${id}`);
    }

    const fetchFriend = async (id) => {
        const response = viewFriend(id);
        return await response;
    };

    const fetchIdentity = async (id) => {
        const response = viewIdentity(id);
        return await response;
    };

    const toggleDrawer = () => {
        setIsDrawer(!isDrawer);
    }

    useEffect(() => {
        if (f && f === 'y') {
            id && fetchFriend(id).then(res => {
                const person = res.data.profile;
                setIdentity(person);
                console.log('friend', person);
            }).catch(err => {
                console.log('err', err);
            });
        } else {
            id && fetchIdentity(id).then(res => {
                const person = res.data;
                setIdentity(person);
                console.log('person', person);
            }).catch(err => {
                console.log('err', err);
            });
        }
    }, [location]);

  return (
    <SpaceSuit>
        <Pane
            title={userStub}
            back={'/'}
            offset={100}
            footer={id && id !== userId ? <FriendActions id={id} f={f} /> : <div style={{height: '30px', width: '64px'}}/>}
        >
        <Row justify="space-between" align="middle">
            <StyledCol span={24}>
                {id ? (
                    <Wrapper>
                        <IdCard
                            className='pitch-mixin'
                            data-augmented-ui="tr-clip br-clip-x b-rect bl-2-clip-y both"
                            onClick={toggleDrawer}
                        >
                             <UserName className="pitch-mixin" data-augmented-ui="tr-clip both">
                                {username}
                            </UserName>
                            <PhotoWrapper
                                data-augmented-ui="tl-clip-x tr-rect br-2-clip-x bl-clip-x both"
                                className='pitch-mixin'
                                image={avatar}
                            /> 
                            <Number>{id}</Number>
                            <FullName>{lastName && `${lastName}, `}{firstName}</FullName>
                            <Drawer
                                placement="right"
                                closable={false}
                                onClose={toggleDrawer}
                                visible={isDrawer}
                                getContainer={false}
                                width='350'
                                style={{ position: 'absolute', width: '300px'}}
                                >
                                <Deets>
                                    {f ? (
                                        <>
                                            <MiniTitle level={4}>Occupation</MiniTitle>
                                            <p>{occupation}</p>
                                            <MiniTitle level={4}>Skills</MiniTitle>
                                            <p>{skills}</p>
                                            <MiniTitle level={4}>Bio</MiniTitle>
                                            <p>{bio}</p>
                                        </>
                                    ) : (
                                        <div style={{marginTop: '100px', textAlign: 'center', overflow: 'auto'}}>
                                            <MiniTitle level={4}>⚠️ACCESS RESTRICTED⚠️</MiniTitle>
                                            <MiniTitle level={4}>SECURTY LEVEL</MiniTitle>
                                            <MiniTitle level={5}>CONTACT</MiniTitle>
                                        </div>
                                    )}
                                </Deets>
                            </Drawer>
                        </IdCard>
                    </Wrapper>
                ) : ( 
                    <QrReader
                        delay={300}
                        constraints={{facingMode: 'environment'}}
                        onResult={(result, error) => {
                        if (!!result) {
                            goToId(result?.text);
                        }
                        if (!!error) {
                            console.info(error);
                        }
                        }}
                    />
                )}
            </StyledCol>
        </Row>
        </Pane>
    </SpaceSuit>
  )
}
