import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

// Proptypes
import PropTypes from 'prop-types';

// Components
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';

// Redux stuff
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class home extends Component {

    componentDidMount() {
        this.props.getScreams(); 
        
    }
    render() {
        //const { screams, loading } = this.props.data;
        const screams = this.props.data.screams;
        const loading = this.props.data.loading;

        let recentScreamsMarkup = !loading ? (
            screams.map(scream => <Scream key ={scream.screamId} scream ={scream}/>)
        ) : (
            <ScreamSkeleton/>
        );
        return (
            <Grid container spacing={6}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    } 
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getScreams})(home);
