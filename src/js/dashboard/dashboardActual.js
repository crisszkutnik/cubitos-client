import React from 'react'
import '../../css/dashboardActual.css'
import LoadingView from '../general_purpose/loadingView'
import ChallengeCard from './challengeCard'

class DashboardActual extends React.Component {
    constructor() {
        super();
        this.state = {userResponse: {}, loaded: false};
    }

    componentDidMount() {
        fetch('/newChallData/getChallengeData', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            this.setState({userResponse: data, loaded: true});
        })
    }

    render() {
        if(this.state.loaded)
            return(
                <div id='dashboardActual'>
                    <div id='header'>
                        <h1>Take a look at this week's challenges</h1>
                    </div>
                    <div id='challenges' className='fade-in'>
                        <ChallengeCard comb={1} solMoves={this.state.userResponse.comb1.moves} startDate={this.state.userResponse.comb1.startDate}/>
                        <ChallengeCard comb={2} solMoves={this.state.userResponse.comb2.moves} startDate={this.state.userResponse.comb2.startDate}/>
                        <ChallengeCard comb={3} solMoves={this.state.userResponse.comb3.moves} startDate={this.state.userResponse.comb3.startDate}/>
                    </div>
                </div>
            );
        else
            return (<LoadingView />);
    }
}

export default DashboardActual;