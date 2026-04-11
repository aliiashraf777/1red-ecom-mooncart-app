import PropTypes from 'prop-types'
import Header from './Header'
import { Outlet } from 'react-router';
import Footer from './Footer';
import InstagramPost, { BottomFourStep } from '../hero/InstagramPost';

 
export const Layout = () => {
    return (
        <div>
            <Header />
 
            <main style={{ minHeight: '80vh' }}>
                <Outlet />
            </main>

            <InstagramPost />
            {/* <BottomFourStep /> */}
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.isRequired,
};