import { observable, action } from "mobx";
import axios from "axios";

export class ClientStore {
  @observable c_id;
  @observable c_name;
  @observable email;
  @observable first_contact;
  @observable sold;
  @observable o_name;
  @observable country;
  @observable e_type;

  constructor(c_id= null, name, email, owner, country, sold = 0, e_type = null, first_contact = null) {
    this.c_id = c_id
    this.c_name = name;
    this.email = email;
    this.sold = sold;
    this.o_name = owner;
    this.country = country;
    this.e_type = e_type;
    this.first_contact = first_contact;
  }

  @action addClient = async () => {
    const values = {
      name: this.c_name,
      email: this.email,
      owner: this.o_name,
      country: this.country
    };
    const result = await axios.post("http://localhost:8080/client", values);
  };

  @action getClient = async id => {
    const result = await axios.get(`http://localhost:8080/client/${id}`)
    this.client = result.data[0]
  } 

  @action updateClient = e => {};
 
}

export default ClientStore;
