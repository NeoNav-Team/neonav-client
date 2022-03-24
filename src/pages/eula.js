import React from 'react';
import SpaceSuit from '../components/spaceSuit'
import styled from 'styled-components';
import {
    Typography
} from 'antd';

const { Title, Text } = Typography;

const LegalWrapper = styled.div`
    padding: 16px;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    overflow: auto;
    max-height: 100vh;
`;

export default function Eula() {
  return (
    <SpaceSuit unlocked>
      <LegalWrapper>
        <Title style={{color: 'white'}} level={2}>End-User License Agreement</Title>

        <Text>This End-User License Agreement (EULA) is a legal agreement between you (either as an individual or on behalf of an entity) and Wayward Communication Corporation (the creators of this software) regarding your use of NeoNav applications, and associated documentation (the "Software"). IF YOU DO NOT AGREE TO ALL OF THE TERMS OF THIS EULA, DO NOT USE THE SOFTWARE.</Text>

        <Title style={{color: 'white'}} level={4}>Summary</Title>
        <Text>You must agree to all of the terms of this EULA to use this Software.</Text>
        <Text>With the exception of your email and password, EVERYTHING YOU TYPE OR SEND THROUGH THIS APP SHOULD BE CONSIDERED PUBLIC. DO NOT SHARE REAL-WORLD CREDIT CARD INFORMATION OR SIMILAR CONFIDENTIAL INFORMATION THROUGH NeoNav. There are role-playing based "hacking" interfaces, and public displays, which may show everything you send through NeoNav, including, but not limited to, chat messages, wallet history, and private messages.</Text>
        <Text>This Software automatically communicates with its server in order to perform its functions.</Text>
        <Text>This Software is provided "as-is" with no warranties, and you agree that Wayward Communication Corporation is not liable for anything you do with it.</Text>
        <Text>You really ought to just go ahead and read the whole EULA. It's not all that long. You should not only rely on this summary.</Text>

        <Title style={{color: 'white'}} level={4}>The Agreement</Title>
        <Text>By downloading, installing, using, or copying the Software, you accept and agree to be bound by the terms of this EULA. If you do not agree to all of the terms of this EULA, you may not download, install, use or copy the Software.</Text>

        <Title style={{color: 'white'}} level={4}>The License</Title>
        <Text>This EULA entitles you to use the Software for any lawful purpose consistent with this EULA. Your license to use the Software is expressly conditioned upon your agreement to all of the terms of this EULA. This software is licensed, not sold. This license is not transferrable, and may be revoked at any time, for any reason. Wayward Communication Corporation reserves all other rights not granted by this EULA.</Text>

        <Title style={{color: 'white'}} level={4}>The Restrictions</Title>
        <Text>When using the Software you must use it in a manner that complies with the applicable laws in the jurisdiction(s) in which you use the Software.</Text>
        <Text>You may not sell, resell, rent, lease or exchange the Software for anything of value.</Text>
        <Text>You may redistribute the software, but it must include this EULA and you may not repackage or bundle the Software with any other software.</Text>
        <Text>You may not remove or alter any proprietary notices or marks on the Software.</Text>

        <Title style={{color: 'white'}} level={4}>Privacy Notices</Title>
        <Text>The Software automatically communicates with its server in order to perform its functions. Please note that only two things are intended to be private in the Software, your email address and your password. Any other information you provide to the Software, including but not limited to private messages, tan/chat messages, transactions, and profile information, can and will be shared with other users, and displayed in public places.</Text>

        <Text>Usage Data. NeoNav collects anonymized data about your usage of the Software to help us make it more awesome. If you do not want to send usage data to the server, you should not use the Software.</Text>

        <Title style={{color: 'white'}} level={4}>Open-Source Notices</Title>
        <Text>Certain components of the Software may be subject to open-source software licenses ("Open-Source Components"), which means any software license approved as open-source licenses by the Open Source Initiative or any substantially similar licenses, including without limitation any license that, as a condition of distribution of the software licensed under such license, requires that the distributor make the software available in source code format. The Software documentation includes copies of the licenses applicable to the Open-Source Components.</Text>

        <Text>To the extent there is conflict between the license terms covering the Open-Source Components and this EULA, the terms of such licenses will apply in lieu of the terms of this EULA. To the extent the terms of the licenses applicable to Open-Source Components prohibit any of the restrictions in this Agreement with respect to such Open-Source Component, such restrictions will not apply to such Open-Source Component. To the extent the terms of the licenses applicable to Open-Source Components require Licensor to make an offer to provide source code in connection with the Product, such offer is hereby made, and you may exercise it by contacting info@wccorp.org.</Text>

        <Title style={{color: 'white'}} level={4}>Intellectual Property Notices</Title>
        <Text>The Software and all worldwide copyrights, trade secrets, and other intellectual property rights therein are the exclusive property of Wayward Communication Corporation. Wayward Communication Corporation reserves all rights in and to the Software not expressly granted to you in this EULA.</Text>

        <Title style={{color: 'white'}} level={4}>Disclaimers and Limitations on Liability</Title>
        <Text>THE SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, AND NO WARRANTY, EITHER EXPRESS OR IMPLIED, IS GIVEN. YOUR USE OF THE SOFTWARE IS AT YOUR SOLE RISK. Wayward Communication Corporation does not warrant that (i) the Software will meet your specific requirements; (ii) the Software is fully compatible with any particular platform; (iii) your use of the Software will be uninterrupted, timely, secure, or error-free; (iv) the results that may be obtained from the use of the Software will be accurate or reliable; (v) the quality of any products, services, information, or other material purchased or obtained by you through the Software will meet your expectations; or (vi) any errors in the Software will be corrected.</Text>

        <Text>YOU EXPRESSLY UNDERSTAND AND AGREE THAT Wayward Communication Corporation SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES (EVEN IF Wayward Communication Corporation HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES) RELATED TO THE SOFTWARE, including, for example: (i) the use or the inability to use the Software; (ii) the cost of procurement of substitute goods and services resulting from any goods, data, information or services purchased or obtained or messages received or transactions entered into through or from the Software; (iii) unauthorized access to or alteration of your transmissions or data; (iv) statements or conduct of any third-party on the Software; (v) or any other matter relating to the Software.</Text>

        <Text>Wayward Communication Corporation reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Software (or any part thereof) with or without notice. Wayward Communication Corporation shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Software.</Text>
        </LegalWrapper>
    </SpaceSuit>
  )
}
