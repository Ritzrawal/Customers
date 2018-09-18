import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import Navbar from './nav-bar'


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class ListProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            question:null,
            id:null,
           
        }
        this.selectQues = this.selectQues.bind(this);
       
        
    }

    componentDidMount() {
        fetch("http://localhost:3003/api/contact"
        ).then((result) => {
            return result.json();
        }).then((resultJson) => {
            this.setState({ questions: resultJson });
        }).catch((err) => {
            console.log("err");
        });
    }

    selectQues(val) {
        this.setState({
            question: val,
            start: true,
            id:val,
        
        })
    }

    handleClick = id => {
        this.props.history.push('/')
        const requestOptions = {
          method: 'DELETE'
        };
        fetch("http://localhost:3003/api/contact/" + id, requestOptions).then((response) => {
          return response.json();
        }).then((result) => {
         console.log('data deleted');
         this.props.history.push('/Profile')
        });
        alert('Customer has been deleted')
      
      }

    render() {
        const { classes } = this.props;
      
        return (
            <div>
                <Navbar/>
                <div className="margin-top-50">
                    <div className="container">
                        <div className="row legend">
                        </div>
                        <div className="row">
                            <div className={classes.root} >
                                {this.state.questions.map((value, i) =>
                                    <ExpansionPanel key={i}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography >{i+1}.   {value.firstName}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography>
                                                <div>
                                                <span style={{marginLeft:'20px'}}>{value.Date_become_customer}</span>
                                                <span style={{marginLeft:'20px'}}>{value.email}</span><br/>
                                                <span style={{marginLeft:'20px'}}>{value.address.line1}</span>
                                                <span style={{marginLeft:'20px'}}>{value.address.line2}</span>
                                                <span style={{marginLeft:'20px'}}>{value.address.line3}</span>
                                                <span style={{marginLeft:'20px'}}>{value.address.city}</span>
                                                <span style={{marginLeft:'20px'}}>{value.address.zip_or_postcode}</span>
                                                <span style={{marginLeft:'20px'}}>{value.address.country}</span>
                                                <br/>
                                                <span style={{marginLeft:'20px'}}>{value.address_type.residential}</span>
                                                <span style={{marginLeft:'20px'}}>{value.address_type.work}</span>
                                                </div>
                                            </Typography>
                                        </ExpansionPanelDetails>
                                        <div class="float-right my-2 mr-3">
                                            {/* <Link to={{ pathname: 'update', state: { question: value } }} ><button type="button" className="btn btn-outline-success" onClick={this.selectQues}>Edit</button></Link> */}
                                            <Link to={{ pathname: 'update', state: { question: value, id:value._id } }} ><button type="button" className="btn btn-outline-success" onClick={this.selectQues}>Edit</button></Link>
                                       <Link to={{ pathname:'/'}} >  <button onClick={() => { this.handleClick(value._id) }} className="btn btn-outline-success">Delete</button></Link>      
                                        
                                        </div>
                                    </ExpansionPanel>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ListProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ListProfile);