import React, { useState } from 'react';
import _ from 'lodash';
import { Input } from 'antd';
import Pane from '../pane';
import { useWindowDimensions } from '../../utils/responsive';
import { getLocalNotes, setLocalNotes } from '../../services/notes';

const { TextArea } = Input;

export default function Notes({ location }) {
    const userStub = <>Notes</>;
    const { height } = useWindowDimensions();
    const textAreaHeight = height - 240;
    const localNotes = getLocalNotes();
    const [notes, setNotes] = useState(_.get(localNotes, 'note', ''));

    const changeHandler = event => {
        const value = event.target.value;
        setNotes(value);
        setLocalNotes({note: value});
    }

  return (
    <>
        <Pane
            title={userStub}
            back={'/'}
            footer={
                <div style={{width:'40px', right:'16px'}}>
                </div>
            }
        >
            <TextArea value={notes} style={{height: textAreaHeight}} onChange={changeHandler} />
        </Pane>
    </>
  )
}
