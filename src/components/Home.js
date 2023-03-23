

// microsoft
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

// css 
import '../styles/Home.css'
import "../styles/Table.css"

const Home = ({setRequestID}) => {

    // const { instance } = useMsal();
    // const { execute, isLoading } = useFetchWithMsal({
    //     scopes: protectedResources.apiLoanComparer.scopes.read,
    // });

    return (
        <div className='Home'>
            <div className='Home-text'>
                <h1> Witamy na Filmy.pl </h1>
            </div>
            <div className='Home-offers'>
                <div className='Home-offers-Whole'>
                    <UnauthenticatedTemplate>
                        Musisz być zalogowany żeby oglądać filmiki.
                    </UnauthenticatedTemplate>
                    <AuthenticatedTemplate>
                       Jesteś zalogowany.Miłego oglądania.
                    </AuthenticatedTemplate>
                </div>
            </div>
        </div>
    );
}

export default Home;