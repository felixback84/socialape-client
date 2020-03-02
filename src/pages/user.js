import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// components
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

//import ScreamSkeleton from '../util/ScreamSkeleton';
//import ProfileSkeleton from '../util/ProfileSkeleton';

// redux stuff
import { connect } from 'react-redux';
import { getUserPublicData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null,
        screamIdParam: null
    };

    // static profile of user
    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;
    
        if (screamId) this.setState({ screamIdParam: screamId });
    
            this.props.getUserPublicData(handle);

            axios
                .get(`/user/${handle}`)
                .then((res) => {
                    //console.log(res.data.user);
                    this.setState({
                        profile: res.data.user
                    });
                })
                .catch((err) => console.log(err));
    }

    render() {
        const { screams, loading } = this.props.data;

        // to visit a scream that has a specific url from any page
        const { screamIdParam } = this.state; 

        const screamsMarkup = loading ? (
            <p>Loading data..</p>
        ) : screams === null ? (
            <p>No screams from this user..</p>
        ) : !screamIdParam ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
        ) : (
            screams.map((scream) => {
                if (scream.screamId !== screamIdParam)
                        return <Scream key={scream.screamId} scream={scream} />;
                    else return <Scream key={scream.screamId} scream={scream} openDialog />;
                })
            )
        
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <p>Loading profile ...</p>
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserPublicData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(
mapStateToProps,
{ getUserPublicData }
)(user);