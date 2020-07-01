import { LightningElement, wire, track, api } from 'lwc';
import getAccounts from '@salesforce/apex/AssignmentController.getAccounts';

export default class FirstLWC extends LightningElement {

  @track accounts;
  @track accountcopy;
  @track error;
  @track searchText;
  @track recordNumber;
  filterText = '';

  // Function used by Account Name,Number of Records and Filter text input texts to listen any change in 
  // respective inputs

  handleInputChange(event) {
    if (event.target.name == 'accountName') {
      this.searchText = event.target.value;
    } else if (event.target.name == 'recordNo') {
      this.recordNumber = event.target.value;
    } else if (event.target.name == 'filter') {
      this.filterText = event.target.value;
    }
  }

  // Function performs fetching of exact number of account records from server matching the account name 
  // input provided as search criteria and storing it in local copy of variable for further use
  
  handleClick() {

    getAccounts({ searchText: this.searchText, recordNumber: this.recordNumber })
      .then(result => { this.accounts = result; this.accountcopy = result; })
      .catch(error => this.error = error);
  }

  // Function performs the filteration of Accounts based on input filter text and displays them
  // If input filter text is blank displays same number of records as before providing filter
  
  handleFilter(event) {

    this.accountcopy = this.accounts.filter(temp => temp.Name.includes(this.filterText));
  }


}