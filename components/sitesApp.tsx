'use client';
import Iframe from 'react-iframe';
import { Fab } from '@mui/material';
import Link from 'next/link';
import ListIcon from '@mui/icons-material/List';
import { positions } from '@mui/system';

interface PageContainerProps {
  children?: React.ReactNode;
}

const NEOSITES_INDEX = 'https://sites.neonav.net'

export default function SitesApp(props:PageContainerProps):JSX.Element {
  const { children } = props;

  return (<>
        <Iframe url={NEOSITES_INDEX}
            width="100%"
            height="100%"
            display="block"
            name="neosites"
            frameBorder={0}
            styles={{marginTop: '64px'}}
            position="relative"
        />
        <div style={{position: 'absolute', bottom: 10, right: 10,}}>
        <Link href={NEOSITES_INDEX} target="neosites">
            <Fab color="secondary" aria-label="index">
                <ListIcon  sx={{ fontSize: '40px'}} />
            </Fab>
        </Link>
        </div>
    </>)
}