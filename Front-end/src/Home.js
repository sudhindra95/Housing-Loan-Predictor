import React, { Component } from 'react';

function Home() {
    return (
        <div className="App">
            <h2>Enter details to get approval chance of your application</h2>
            <JsonForm />
        </div>
    );
}

export default Home;


class JsonForm extends Component {

    constructor(props) {
        super(props);
        this.state={Gender:'Male',Married:'No',
        Dependents:0,Education:'Graduate',Self_Employed: 'No',
        ApplicantIncome:5489,	CoapplicantIncome:0,	LoanAmount:128,	Loan_Amount_Term:360,	Credit_History:1,	Property_Area:'Urban',
        score:1};


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit(event) {
        
        event.preventDefault();
        const url="http://localhost:8000/scoreJson";
        const bodyData=JSON.stringify({"Gender":this.state.Gender,"Property_Area":this.state.Property_Area,
          "Married":this.state.Married,"Dependents":this.state.Dependents,
          "Education":this.state.Education,"Self_Employed":this.state.Self_Employed,
          "ApplicantIncome":this.state.ApplicantIncome,"Credit_History":this.state.Credit_History,
          "CoapplicantIncome":this.state.CoapplicantIncome,"LoanAmount":this.state.LoanAmount,
          "Loan_Amount_Term":this.state.Loan_Amount_Term});
        const requestOptions={method:"POST",headers:{"Content-type": "application/json" },body:bodyData  };
        
        fetch(url,requestOptions)
        .then((resp) => resp.json())
        .then((respJ) => this.setState({score:respJ.score}))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                        <tr><td>Name :</td><td>
                                    <input type="text"  ></input></td></tr>  
                        <tr><td>Gender :</td><td>
                                    <input type="text" name="Gender" value={this.state.Gender} onChange={this.handleChange} ></input></td></tr>
                            <tr><td>  Married : </td><td>
                                <input type="text" name="Married" value={this.state.Married} onChange={this.handleChange} ></input></td></tr>
                            <tr><td>  Dependents : </td><td>
                                <input type="text" name="Dependents" value={this.state.Dependents} onChange={this.handleChange} ></input></td></tr>
                            <tr><td>  Education : </td><td>
                                <input type="text" name="Education" value={this.state.Education} onChange={this.handleChange} ></input></td></tr>
                            <tr><td>  Self Employed : </td><td>
                                <input type="text" name="Self_Employed" value={this.state.Self_Employed} onChange={this.handleChange} ></input></td></tr>
                            <tr><td>  Applicant Income : </td><td>
                                <input type="text" name="ApplicantIncome" value={this.state.ApplicantIncome} onChange={this.handleChange} ></input></td></tr>
                            <tr><td>  Co-Applicant Income : </td><td>
                                <input type="text" name="CoapplicantIncome" value={this.state.CoapplicantIncome} onChange={this.handleChange} ></input></td></tr>
                            <tr><td>  Loan Amount : </td><td>
                                <input type="text" name="LoanAmount" value={this.state.LoanAmount} onChange={this.handleChange} ></input></td></tr>
                            <tr><td>  Loan Amount Term : </td><td>
                                <input type="text" name="Loan_Amount_Term" value={this.state.Loan_Amount_Term} onChange={this.handleChange} ></input></td></tr>
                            <tr><td>  Credit History : </td><td>
                                <input type="text" name="Credit_History" value={this.state.Credit_History} onChange={this.handleChange} ></input></td></tr>

                            <tr><td>  Property Area : </td><td>
                                <input type="text" name="Property_Area" value={this.state.Property_Area} onChange={this.handleChange} ></input></td></tr>
                        </tbody>
                    </table>

                    <input type="submit" value="Submit" ></input>
                </form>
                <div><h3>The probability of getting approval is {this.state.score}%</h3></div>
            </div>
        )
    }

}

