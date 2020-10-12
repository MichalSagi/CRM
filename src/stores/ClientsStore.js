import { observable, action, computed } from "mobx";
import { ClientStore } from "./ClientStore";
import axios from "axios";
import moment from "moment";
const dateFormat = require("dateformat");

export class ClientsStore {
  @observable clients = [];
  @observable owners = [];
  @observable countries = [];
  @observable emailTypes = [];
  @observable hottestCountry = "";
  @observable topOwners = [];
  @observable firstContactList = [];
  @observable firstContactByMonths = [];
  @observable salesDate = []
  @observable client = {}

  @computed get numClients() {
    this.getClientsFromDB();
    return this.clients.length;
  }

  @computed get emailsSend() {
    return this.clients.filter(c => c.e_type !== null).length;
  }

  @computed get outstandingClients() {
    return this.clients.length - this.clients.filter(c => c.e_type !== null).length;
  }

  @computed get monthClients() {
    return this.clients.filter(
      c =>
        dateFormat(c.first_contact, "mm") === dateFormat(new Date(), "mm") && dateFormat(c.first_contact, "yyyy") === dateFormat(new Date(), "yyyy")
    ).length;
  }

  @action getClientsFromDB = async () => {
    let result = await axios.get("http://localhost:8080/clients");
    this.clients = result.data.map(c => new ClientStore(c.c_id, c.client_name, c.email, c.o_name, c.country, c.sold, c.e_type, c.firstContact));
  };

  @action getHottestCountry = async () => {
    let result = await axios.get("http://localhost:8080/country");
    this.hottestCountry = result.data[0].c_name;
  };

  @action filteredClientsList = (value, filterValue) => {
    const regex = `^${value}`;
    let filteredClients = [];
    if (filterValue === "sold") {
      filteredClients = this.clients.filter(c => c.sold !== "-");
    } else {
      for (let client of this.clients) {
        if (client[filterValue].toLowerCase().match(regex)) {
          filteredClients.push(client);
        }
      }
    }
    return (this.clients = filteredClients);
  };

  @action checkCuontry = async country => {
    const countryCheck = await this.countries.find(c => c.c_name === country);
    if (!countryCheck) {
      await axios.post("http://localhost:8080/country", { country });
      await this.getCountriesList();
    }
  };

  @action addClient = async values => {
    let newClient = this.clients.find(c => c.name === values.name);
    if (!newClient) {
      await this.checkCuontry(values.country);
      const newDbClient = { c_name: values.name, email: values.email, o_name: values.owner, country: values.country };
      await axios.post("http://localhost:8080/client", newDbClient);
      this.getClientsFromDB();
    }
  };

  @action getOwnersList = async () => {
    const result = await axios.get("http://localhost:8080/owners");
    this.owners = result.data;
  };

  @action getCountriesList = async () => {
    const result = await axios.get("http://localhost:8080/countries");
    this.countries = result.data;
  };

  @action getEmailTypes = async () => {
    const result = await axios.get("http://localhost:8080/etypes");
    this.emailTypes = result.data;
  };

  @action updateClient = async client => {
    const clientToUpdate = this.clients.find(c => c.c_id === client.c_id);
    await this.checkCuontry(client.country);
    console.log(clientToUpdate.sold)
    console.log(clientToUpdate)
    const result = await axios.put(`http://localhost:8080/client/${clientToUpdate.c_id}`, clientToUpdate);
    this.getClientsFromDB();
  };

  @action getTopOwners = async () => {
    const result = await axios.get(`http://localhost:8080/owners/top`);
    this.topOwners = result.data;
  };

  @action getFirstContactCount = async () => {
    const result = await axios.get(`http://localhost:8080/firstcontact`);
    this.firstContactList = result.data;
  };

  @action getFirstContactByMonths = async () => {
    const result = await axios.get(`http://localhost:8080/firstcontact/month`);
    this.firstContactByMonths = result.data;
  };

  @action dateRange = async dates => {
    const rangeList = [];
    if (!dates) {
      await this.getFirstContactByMonths();
    } else {
      for (let month of this.firstContactByMonths) {
        if (moment(month.firstDate).isBetween(dates[0], dates[1], "months", "[]")) {
          rangeList.push(month);
        }
      }
      return (this.firstContactByMonths = rangeList);
    }
  };

  @action filteredSales = async value => {
    let result
    if (value === "country") {
      result = await axios.get("http://localhost:8080/countries/group/list")
    }
    if (value === "o_name") {
      result = await axios.get("http://localhost:8080/owners/top/list")
    }
    if (value === "e_type") {
      result = await axios.get("http://localhost:8080/etype/list")
    }
    if (value === 'first_contact') {
      result = await axios.get("http://localhost:8080/firstcontact/month/list")
    }
    return this.salesDate = result.data
  };
}
