import React, { useState } from 'react';
import styled from 'styled-components';


const StyledInputDiv = styled.div`
    display: block;
    background: transparent;
    height: 48px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    & button {
        height: 12vh;
        width: 12vh;
    }
    &.pitch-mixin {
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, #7a04eb, rgba(122, 4, 235, 0))  50% 50% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(#7a04eb, #7a04eb) 100% 100% / 100% 100%;
    }
`;

const StyledInput =  styled.input`
    width: 100%;
    background: transparent;
    color: #fff;
    border: none;
    min-height: 48px;
    text-indent: 10vw;
`;

function ChatInputBar(props) {
    const { channel, submitHandler } = props;
    const [form, setForm] = useState({text: ''});
    const updateField = e => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      };
    const sendText = event => {
        event.preventDefault();
        submitHandler(channel, form);
        setForm({text: ''});
    }

    return (
        <div data-augmented-ui-reset>
            <StyledInputDiv className="pitch-mixin" data-augmented-ui="tl-clip-x tr-clipczx-x br-clip bl-clip both">
                <form onSubmit={sendText}>
                    <StyledInput
                        type="text"
                        value={form.text}
                        name="text"
                        placeholder="type message here"
                        onChange={updateField}
                    />
                    <input type="submit" style={{'visibility':'hidden', 'position':'absolute'}}/>
                </form>
            </StyledInputDiv>
        </div>
    )
}
export default ChatInputBar;