import { useContext } from 'react';
import { RouterContext } from '../../contexts';
import { ContactsPage } from '../../pages/Contacts';
import { ReservationPage } from '../../pages/Reservation'
import { ROUTES } from '../../Routes';
import { NavigationLink } from '../MenuLink/MenuLink';
import { UserContext } from '../../contexts/UserContext';

const PageResolver = (routeId: string) => {
    switch (routeId) {
        case 'default':
        case 'ReservationPage':
            return <ReservationPage />;
        case 'Contacts':
            return <ContactsPage />
    }
}

const Greetings = () => {
    const { name, phone } = useContext(UserContext);

    if (name) {
        return <div style={{ position: 'absolute', right: '30px' }}>Здравствуйте, {name}</div>
    }
    return null;
}

export const BaseLayout = () => {
    const { currentRoute, setCurrentRoute } = useContext(RouterContext);

    const goToRoute = (routeId: string) => {
        const path = ROUTES.find(route => route.id === routeId)?.path;
        history.pushState(null, '', path);
        setCurrentRoute(routeId);
    };

    return (
        <>
            <header>
                {ROUTES.toSorted((a,b) => a.weight - b.weight).map(route => (
                    <NavigationLink
                        id={route.id}
                        title={route.menuTitle}
                        onClick={goToRoute}
                        path={route.path}
                        key={route.id}
                    />
                ))}
            </header>
            <main>
                <Greetings />
                {PageResolver(currentRoute)}
            </main>
            <footer>2024 ©</footer>    
        </>
    )
};