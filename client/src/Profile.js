import React from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navbar from './nav-bar'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});
class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        firstName: "",
        email: '',
        line1:'',
        line2:'',
        line3:'',
        zip_or_postcode:'',
        residential:'',
        work:'',
        city:'',
        country:'',
        data:[],
        errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firstName = this.firstName.bind(this);
    this.email = this.email.bind(this);
    this.zip_or_postcode = this.zip_or_postcode.bind(this);
    this.line1 = this.line1.bind(this);
    this.line2 = this.line2.bind(this);
    this.line3 = this.line3.bind(this);
    this.residential = this.residential.bind(this);
    this.work = this.work.bind(this);
    this.city = this.city.bind(this);
    this.country = this.country.bind(this);
  
    
}
thirdMethod(e) {
  const re = /[a-zA-Z]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}
fourthMethod(e) {
  const re = /[0-9]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}
fifthMethod(e) {
  const re = /[0-9a-zA-Z]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}

handleValidation(){
  let firstName = this.state.firstName;
  let errors = {};
  let formIsValid = true;

  
  if(!firstName){
    formIsValid = false;
    errors.firstName= "Cannot be empty";
  }

  if(typeof firstName !== "undefined"){
    if(!firstName.match(/^[a-zA-Z]+$/)){
      formIsValid = false;
      errors["name"] = "Only letters";
    }      	
  }
  this.setState({errors: errors});
  return formIsValid;
}


firstName(event) {
  this.setState({
    firstName: event.target.value
  });
}
email(event) {
  this.setState({
    email: event.target.value
  });
}
line1(event) {
  this.setState({
    line1: event.target.value
  });
}
zip_or_postcode(event) {
  this.setState({
    zip_or_postcode: event.target.value
  });
}
line2(event) {
  this.setState({
      line2: event.target.value
  });
}
line3(event) {
  this.setState({
      line3: event.target.value
  });
}
city(event) {
  this.setState({
      city: event.target.value
  });
}
country(event) {
  this.setState({
      country: event.target.value
  });
}
residential(event) {
  this.setState({
    residential: event.target.value
  });
}
work(event) {
  this.setState({
      work: event.target.value
  });
}
handleSubmit(event) {
  this.props.history.push('/')
  event.preventDefault();
  if(this.handleValidation()){
    const { firstName, email } = this.state;
  fetch('https://shielded-citadel-95440.herokuapp.com/api/contact', {
      method: 'POST',
      body: JSON.stringify({
          firstName,
          email,
          address: {
            line1: this.state.line1,
            line2: this.state.line2,
            line3: this.state.line3,
            city: this.state.city,
            zip_or_postcode: this.state.zip_or_postcode,
            country: this.state.country
          },
          address_type:{
            residential: this.state.residential,
            work: this.state.work,

          },

      }),
      headers: { 'Content-Type': 'application/json' }

  }).then((response) => response.json())
      .then((result) => {

          this.setState({
              data: result,

          });
      }).catch(err => {
          alert(err);
      });
      this.props.history.push('/')
      alert('Customer is successfully added');
  }else{
    alert("Form has errors.")
  }

  
}
  render() {
    const { classes } = this.props;

    return (
      
      <div> <Navbar/>
      <div    style={{  display: 'flex',  justifyContent: 'center'  }} >
     
      
        <div className="margin-top-50">
          <div className="container" style={{ boxSizing: 'border-box', borderStyle: 'ridge', width: '845px', marginTop: '40px'  }}>
            <div className="row legend"    style={{  display: 'flex', justifyContent: 'center',  borderStyle: 'ridge' }}>  
              <h1 style={{ fontSize: '15px', marginLeft: '2px' }}>Customers</h1>
            </div>
            <div className="row">
              <div className="container">
                <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                  <div className="row">
                    <div className="form-group col-md-4">
                    <TextField
                    inputProps={{
                      maxLength: 200,
                    }}
                    onKeyPress={(e) => this.thirdMethod(e)}
                    
                    
                        label="Name"
                        id="Name"
                        className={classes.textField}
                        value={this.state.firstName}
                         onChange={this.firstName}
                         required="true"
                         pattern="[a-zA-Z0-9 ]+"
                         margin="normal"
                         validators={['required', 'isfirstName']}
                         errorMessages={['this field is required', 'firstName is not valid']}
                      /> 
                     <TextValidator
                    label="Email"
                    onChange={this.email}
                    name="email"
                    required="true"
                    id="Email"
                    margin="normal"
                    value={this.state.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                    </div>

                    </div> 
                    <div className="row legend"    style={{  display: 'flex',width:'100%',  justifyContent: 'center',borderStyle: 'ridge'  }}>  
              <h2 style={{ fontSize: '15px', marginLeft: '2px', }}>Address Type</h2>
              </div> 
              <div className="form-group col-md-4">
                        <TextField
                        inputProps={{
                          maxLength: 200,
                        }}
                        required="true"
                          label="Resedential"
                          id="Resedential"
                          value={this.state.residential}
                          className={classes.textField}
                          margin="normal"
                          onKeyPress={(e) => this.fifthMethod(e)}
                          
                          onChange={this.residential}
                        />
                        <TextField
                        inputProps={{
                          maxLength: 200,
                        }}
                          label="Work"
                          id="Work"
                          required="true"
                          onKeyPress={(e) => this.fifthMethod(e)}
                          value={this.state.work}
                          className={classes.textField}
                          margin="normal"
                          onChange={this.work}
                        />
                        </div>
                          
                            <div className="row legend"    style={{  display: 'flex',width:'100%',  justifyContent: 'center',  borderStyle: 'ridge'}}>  
              <h3 style={{ fontSize: '15px', marginLeft: '2px', }}>Address</h3>
              </div>
                    <div className="row">
                      <div className="form-group col-md-4">
                        <TextField
                        inputProps={{
                          maxLength: 200,
                        }}
                          label="Line1"
                          id="Line1"
                          required="true"
                          value={this.state.line1}
                          className={classes.textField}
                          margin="normal"
                          onKeyPress={(e) => this.fifthMethod(e)}
                          onChange={this.line1}
                        />
                        <TextField
                        inputProps={{
                          maxLength: 200,
                        }}
                          label="Line2"
                          id="Line2"
                          value={this.state.line2}
                          required="true"
                          className={classes.textField}
                          margin="normal"
                          onKeyPress={(e) => this.fifthMethod(e)}
                          onChange={this.line2}
                        />
                        <TextField
                         inputProps={{
                          maxLength: 200,
                        }}
                          label="Line3"
                          id="Line3"
                          required="true"
                          value={this.state.line3}
                          className={classes.textField}
                          margin="normal"
                          onKeyPress={(e) => this.fifthMethod(e)}
                          onChange={this.line3}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <TextField
                        inputProps={{
                          maxLength: 200,
                        }}
                          label="City"
                          id="city"
                          required="true"
                          value={this.state.city}
                          onKeyPress={(e) => this.thirdMethod(e)}
                          className={classes.textField}
                          margin="normal"
                          onChange={this.city}
                        />
                  <TextValidator
                    label="zip_or_postcode"
                    inputProps={{
                      maxLength: 8,
                    }}
                    required="true"
                    onChange={this.zip_or_postcode}
                    name="zip_or_postcode"
                    id="zip_or_postcode"
                    margin="normal"
                    onKeyPress={(e) => this.fourthMethod(e)}
                    value={this.state.zip_or_postcode}
                    errorMessages={['this field is required', 'zip_or_postcode is not valid']}
                />
                        <TextField
                        inputProps={{
                          maxLength: 200,
                        }}
                          label="Country"
                          id="country"
                          onKeyPress={(e) => this.thirdMethod(e)}
                          value={this.state.country}
                          className={classes.textField}
                          margin="normal"
                          required="true"
                          
                          onChange={this.country}
                        />
                        {/* <button style={{color:'red',justifyContent:'center',position:'relative',left:'70px',width:'120px'}}>Submit</button> */}
                        <button style={{color:'red',justifyContent:'center',left:'90px',width:'240px',bottom:'40px',height:'60px'}}>Submit</button>
                      </div>
                      </div>
                </ValidatorForm>
              </div>
            </div>
          </div>
        </div >
        </div>
      </div >
    )
  }
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);