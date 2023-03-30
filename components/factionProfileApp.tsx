/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Resizer from "react-image-file-resizer";
import styles from '../styles/generic.module.css';
import { Context as NnContext } from './context/nnContext';
import { NnProviderValues, nnEntity, NnContact, NnStatus } from './context/nnTypes';
import SimpleScrollContainer from './simpleScrollContainer';
import SubheaderFaction from './subheaderFaction';
import FooterNav from './footerNav';
import ItemStatus from './itemStatus';
import { 
  Container,
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TocIcon from '@mui/icons-material/Toc';
import TagIcon from '@mui/icons-material/Tag';
import SaveIcon from '@mui/icons-material/Save';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Stack } from '@mui/system';
import { use100vh } from 'react-div-100vh';

interface FactionProfileAppProps {
  params: {
    id: string;
  }
};

type Form = {
  name?: string;
  image?: string;
  tagline?: string;
  description?: string;
}
type FormKey = 
  'name' | 
  'image' | 
  'tagline' | 
  'description';

const defaultForm = {
  name: '',
  image: '',
  tagline: '',
  description: ''
};

const flexContainer = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  alignContent: 'space-around',
  alignItems: 'stretch',
};  

const flexBody = {
  order: 0,
  flex: '1',
  alignSelf: 'auto',
  width: '100%',
  minWidth: '100%',
  minHeight: '50vh',
  overflow: 'hidden',
};

const flexFooter = {
  order: 0,
  flex: '0 1 24px',
  alignSelf: 'flex-end',
  width: '100%',
};

export default function FactionProfileApp(props: FactionProfileAppProps):JSX.Element {
  const { params } = props;
  const { id } = params;
  const FULL_HEIGHT = use100vh() || 600;
  const FLEX_HEIGHT = FULL_HEIGHT - 75;
  const SCROLL_HEIGHT = FULL_HEIGHT - 114;
  const { 
    state,
    fetchFactionDetails = (accountId:string) => {},
    fetchFactionStatuses = (accountId:string) => {},
    updateFactionProfile = (factionId:string, document:any, update:any) => {},
  }: NnProviderValues = useContext(NnContext);
  const profile:nnEntity = useMemo(() => {
    return state?.network?.entity || {};
  }, [state]);
  const statuses:NnStatus[] = useMemo(() => {
    const statuses = state?.network?.collections?.statuses || [];
    return statuses.filter(status => status.class === 'public');
  }, [state?.network?.collections?.statuses]);
  const userId = state?.user?.profile?.auth?.userid;
  const accountId = id || state?.network?.selected?.account || '';
  const admin = profile && profile?.admin?.length && profile?.admin[0];
  const reps = profile && profile?.reps;
  const isAdmin = profile && userId === admin?.userid;
  const isRep = isAdmin || (reps && reps.filter((user:NnContact) => user.id === userId).length >= 1);
  const [ profileFetched, setProfileFetched ] = useState(false);
  const [ editMode, setEditMode ] = useState(false);
  const [ form, setForm ] = useState<Form>(defaultForm);
  const { name, image, tagline, description } = form;
  const [ photo, setPhoto ] = useState<string | undefined>();
  const isRecentEntity = profile.id === accountId;

  const goFetchFactionProfile = useCallback(() => {
    if (!profileFetched || !isRecentEntity) {
      fetchFactionDetails(accountId);
      fetchFactionStatuses(accountId);
      setProfileFetched(true);
    }
  }, [profileFetched, isRecentEntity, fetchFactionDetails, accountId, fetchFactionStatuses]);

  const updateDefaultForm = (profile:nnEntity) => {
    let updatedDefaultForm:Form = defaultForm;
    Object.keys(updatedDefaultForm).map(function(key){
      if((profile as any)[key]) (updatedDefaultForm as any)[key]=(profile as any)[key]
    });
    setForm(updatedDefaultForm);
  }

  useEffect(() => {
    goFetchFactionProfile();
  }, [accountId, goFetchFactionProfile, profile]);

  useEffect(() => {
    if (Object.keys(profile).length >= 3) {
      updateDefaultForm(profile);
    }
  }, [profile]);

  const resizeFile = (file:File, field:FormKey, size:number) => {
    Resizer.imageFileResizer(
      file,
      size,
      size,
      "PNG",
      100,
      0,
      (uri) => {
        setForm({...form, [field]:uri } );
        setPhoto(uri as string);
      },
      "base64"
    );
  };

  const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    setForm({...form, [name]: value } );
  }

  const uploadHandler = async (event:React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event?.currentTarget;
    files && resizeFile(files[0], 'image', 600);
  }


  const saveProfileChanges = () => {
    const doc = {
      _id: state?.network?.entity?._id,
      _rev: state?.network?.entity?._rev,
    }
    updateFactionProfile(accountId, doc, form);
  } 

  const editButtonAction = ()=> {
    if (editMode) {
      saveProfileChanges();
      setPhoto(image);
    } else {
      goFetchFactionProfile(); //get latest before editing
    }
    setEditMode(!editMode);
  }

  const writeButtonAction = (value:string) => {
    console.log('value', value);
  }

  return (
    <Container disableGutters style={{height: '100%'}}>
      <div
        className={styles.darkPane}
        style={{height: '100%', maxHeight: 'calc(100% - 74px)', marginTop: '70px'}}
        data-augmented-ui="tl-clip-x tr-rect br-clip bl-clip both"
      >
        <Box sx={{...flexContainer, minHeight: FLEX_HEIGHT, maxHeight: FLEX_HEIGHT}}>
          <Box sx={{...flexBody, maxHeight: SCROLL_HEIGHT }}>
            {(profileFetched && isRecentEntity) ? (
              profile && Object.keys(profile).length !== 0 ?(
                <SimpleScrollContainer>
                  <Box sx={{minWidth: '100%', minHeight: '100%'}}>
                    <Stack spacing={0} sx={{ display: 'flex' }}>
                      <div>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          {editMode ? (
                            <Stack spacing={2} >
                              <img src={photo || image} alt="Please upload an image" style={{minWidth: 200, minHeight: 200, maxWidth: '95%'}} />
                              <Button variant="contained" component="label" endIcon={<PhotoCameraIcon />}>
                                Upload
                                <input hidden multiple type="file" onChange={uploadHandler} accept="image/png, image/jpeg" />
                              </Button>
                              <TextField onChange={changeHandler} name="name" value={name} label="Faction Name" sx={{width: '100%'}} variant="outlined" />
                              <TextField onChange={changeHandler} name="tagline" value={tagline} label="tagline" sx={{width: '100%'}} variant="outlined" />
                              <TextField onChange={changeHandler} name="description" value={description} multiline rows={4} label="Description" variant="outlined" />
                            </Stack>
                          ) : (
                            <>
                              <SubheaderFaction title={name} subtitle={tagline} photo={image}/>
                            </>
                          )}
                        </Box>
                      </div>
                      {!editMode && (
                        <Box>
                          <Divider variant="middle" color="primary"><Typography variant="h6">About Us</Typography></Divider>
                          <p>{description}</p>
                          <Divider variant="middle" color="(primary"><Typography variant="h6">Recent News</Typography></Divider>
                          {statuses && statuses.length >= 1 ? (
                            <Box sx={{ minWidth: '100%', minHeight: '100%' }}>
                              <Stack spacing={0} style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                                {statuses && statuses.length >= 1 && statuses.map(item => {
                                  return (
                                    <div
                                      key={`${item.id}-container`}
                                    >
                                      <ItemStatus
                                        id={item.id}
                                        username={item.from}
                                        date={item.ts}
                                        text={item.body}
                                        collection="status"
                                        hidden={item.class !== 'public'}
                                      />
                                    </div>
                                  );
                                })}
                              </Stack>
                            </Box>
                          ): (
                            <p><em>Nothing to report.</em></p>
                          )}
                        </Box>
                      )}
                    </Stack>
                  </Box>
                </SimpleScrollContainer>
              ) : (
                <Typography variant='h2'> 404 Faction Not Found</Typography>
              )) : (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{minHeight: '100%'}}
              >
                <CircularProgress color="secondary" />
              </Stack>
            )}
          </Box>
          <Box sx={flexFooter}>
            <FooterNav
              firstHexProps={{
                icon: editMode ? <SaveIcon /> : <BorderColorIcon />,
                disabled: !isAdmin,
                handleAction: editButtonAction,
              }}
              secondHexProps={{
                disabled: true,
                icon: <AllInboxIcon />,
                link: `/factions/${accountId}/statuses`,
              }}
              bigHexProps={
                isRep ? {
                  icon: <RateReviewIcon />,
                  link: `/factions/${accountId}/setstatus`,
                } : {
                  icon: <RateReviewIcon />,
                  handleAction: writeButtonAction,
                  dialog: 'Share your thoughts with us?',
                  useInput: true,
                }
              }
              thirdHexProps={{
                disabled: true,
                icon: <TagIcon />,
                link: `/factions/${accountId}/tags`,
              }}
              fourthHexProps={{
                icon: <TocIcon />,
                link: '/factions',
              }}
            />
          </Box>
        </Box>
      </div>
    </Container>
  )
}