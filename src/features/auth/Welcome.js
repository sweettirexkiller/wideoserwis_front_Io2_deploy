import {useSelector} from "react-redux";
import {selectCurrentUser, selectCurrentToken} from "./authSlice";
import {Link} from 'react-router-dom';
import {Text} from "@chakra-ui/react";

const Welcome = ()=>{
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    const welcome = user ? `Welcome ${user}!` : 'Welcome!';
    const tokenAbbr = `${token.slice(0,9)}...`;
    const content = (
        <Text>
            {welcome}
            Token: {tokenAbbr}
        </Text>
    );

    return content;
}

export default Welcome;