import { LogLevel } from "@azure/msal-browser";

/**
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_susi_v2',
        forgotPassword: 'B2C_1_reset_v3',
        editProfile: 'B2C_1_edit_profile_v2',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://videoserviceio.b2clogin.com/videoserviceIO.onmicrosoft.com/B2C_1_signup_signin',
        },
        forgotPassword: {
            authority: 'https://videoserviceio.b2clogin.com/videoserviceIO.onmicrosoft.com/B2C_1_reset_v3',
        },
        editProfile: {
            authority: 'https://videoserviceio.b2clogin.com/videoserviceIO.onmicrosoft.com/B2C_1_edit_profile',
        },
    },
    authorityDomain: "videoserviceio.b2clogin.com"
}

/**
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "eb4b9d66-1c02-4e17-93f5-18f7b58db519",
        authority: b2cPolicies.authorities.signUpSignIn.authority, 
        knownAuthorities: [b2cPolicies.authorityDomain], 
        redirectUri: "/",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: false, 
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;
                    default:
                        return;
                }	
            }	
        }	
    }
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    apiLoanComparer: {
        // endpoint: 'https://bank-project-backend-dev.azurewebsites.net/',
        scopes: {
            read: ['https://videoserviceio.onmicrosoft.com/cfed5934-37d5-4415-86b6-45c04ed3aa6a/users.read'],
            write: ['https://videoserviceio.onmicrosoft.com/cfed5934-37d5-4415-86b6-45c04ed3aa6a/users.write'],
        },
    },
};


/**
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...protectedResources.apiLoanComparer.scopes.read, ...protectedResources.apiLoanComparer.scopes.write],
};