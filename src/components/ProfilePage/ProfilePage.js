import React, {Component} from 'react';
import LoadUserJabs from '../LoadUserJabs/LoadUserJabs';
import styles from './ProfilePage.module.scss';
import AppNavigation from '../AppNavigation/AppNavigation';

class ProfilePage extends Component{
    constructor() {
        super() 

        this.state = {

        }
    }

    
    render() {
        return(
            <div>
                <AppNavigation/>
                <section className={styles.profile_page_top}>
                <div className={styles.delete_icon}>
                <h1>Delete Your Jabs</h1>
                <img src="https://images.vexels.com/media/users/3/158148/isolated/preview/9043e523c85dcaeb815975c32cffd879-sad-open-mouth-icon-by-vexels.png" alt=""/>
                </div>
                <LoadUserJabs />
                </section>
                <section className={styles.profile_page_bottom}>
                <h1>hello, this is the bottom section of Jabber Main Page</h1>
                </section>
            </div>
        )
    }
}

export default ProfilePage