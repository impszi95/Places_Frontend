<template>
  <div class="create_place">
    <h1>Create new place</h1>
    <div class="inputs">
      <b-field label="Name">
        <b-input v-model="name" placeholder="Name of the place"></b-input>
      </b-field>
      <div>
        <div class="addr_a">
          <b-field label="Country">
            <b-input v-model="country" placeholder="Country"></b-input>
          </b-field>
          <b-field label="State">
            <b-input v-model="state" placeholder="State"></b-input>
          </b-field>
        </div>
        <div class="addr_a">
          <b-field label="City">
            <b-input v-model="city" placeholder="City"></b-input>
          </b-field>
          <b-field label="Street">
            <b-input v-model="street" placeholder="Street"></b-input>
          </b-field>
          <b-field label="Street number">
            <b-input v-model="streetNum"></b-input>
          </b-field>
        </div>
      </div>
      <div class="opening_hours">
        <div class="oh">
          <b-field label="Monday">
          <b-input v-model="mo_input.from" placeholder="From"></b-input>
          <b-input v-model="mo_input.to" placeholder="To"></b-input>
        </b-field>
        </div>
        <div class="oh">
           <b-field label="Tuesday">
          <b-input v-model="tu_input.from" placeholder="From"></b-input>
          <b-input v-model="tu_input.to" placeholder="To"></b-input>
        </b-field>
        </div>
        <div class="oh">
           <b-field label="Wednesday">
          <b-input v-model="we_input.from" placeholder="From"></b-input>
          <b-input v-model="we_input.to" placeholder="To"></b-input>
        </b-field>
        </div>
        <div class="oh">
          <b-field label="Thursday">
          <b-input v-model="th_input.from" placeholder="From"></b-input>
          <b-input v-model="th_input.to" placeholder="To"></b-input>
        </b-field>
        </div>
        <div class="oh">
          <b-field label="Friday">
          <b-input v-model="fr_input.from" placeholder="From"></b-input>
          <b-input v-model="fr_input.to" placeholder="To"></b-input>
        </b-field>
        </div>
        <div class="oh">
           <b-field label="Saturday">
          <b-input v-model="sa_input.from" placeholder="From"></b-input>
          <b-input v-model="sa_input.to" placeholder="To"></b-input>
        </b-field>
        </div>
        <div class="oh">
          <b-field label="Sunday">
          <b-input v-model="su_input.from" placeholder="From"></b-input>
          <b-input v-model="su_input.to" placeholder="To"></b-input>
        </b-field>
        </div>
      </div>
      <b-button @click="Save()" type="is-success">Save place</b-button>
      <p class="resp">{{ savedPlaceId }}</p>
    </div>
  </div>
</template>

<script>
import PlaceService from "@/service/PlaceService";

export default {
  data() {
    return {
      name: "",
      country: "",
      state: "",
      city: "",
      street: "",
      streetNum: 0,
      openingHours: [],
      savedPlaceId: "",

      mo: {day:"Monday", intervals:[{from: "00:00", to: "00:00"}]},
      tu: {day:"Tuesday", intervals:[{from: "00:00", to: "00:00"}]},
      we: {day:"Wednesday", intervals:[{from: "00:00", to: "00:00"}]},
      th: {day:"Thursday", intervals:[{from: "00:00", to: "00:00"}]},
      fr: {day:"Friday", intervals:[{from: "00:00", to: "00:00"}]},
      sa: {day:"Saturday", intervals:[{from: "00:00", to: "00:00"}]},
      su: {day:"Sunday", intervals:[{from: "00:00", to: "00:00"}]},

      mo_input: {from: "", to: ""},
      tu_input: {from: "", to: ""},
      we_input: {from: "", to: ""},
      th_input: {from: "", to: ""},
      fr_input: {from: "", to: ""},
      sa_input: {from: "", to: ""},
      su_input: {from: "", to: ""},
    };
  },
  methods: {
    async Save() {
      if (this.name != "" && this.country != "" && this.state != ""
       && this.city != "" && this.street !="" && this.streetNum!=0) {

         //Later should change to handle multiple intervals
        if(this.mo_input.from!="" && this.mo_input.to!=""){
          this.mo.intervals[0].from = this.mo_input.from; 
          this.mo.intervals[0].to = this.mo_input.to;
        }
        if(this.tu_input.from!="" && this.tu_input.to!=""){
          this.tu.intervals[0].from = this.tu_input.from; 
          this.tu.intervals[0].to = this.tu_input.to;
        }
        if(this.we_input.from!="" && this.we_input.to!=""){
          this.we.intervals[0].from = this.we_input.from; 
          this.we.intervals[0].to = this.we_input.to;
        }
        if(this.th_input.from!="" && this.th_input.to!=""){
          this.th.intervals[0].from = this.th_input.from; 
          this.th.intervals[0].to = this.th_input.to;
        }
         if(this.fr_input.from!="" && this.fr_input.to!=""){
          this.fr.intervals[0].from = this.fr_input.from; 
          this.fr.intervals[0].to = this.fr_input.to;
        }
         if(this.sa_input.from!="" && this.sa_input.to!=""){
          this.sa.intervals[0].from = this.sa_input.from; 
          this.sa.intervals[0].to = this.sa_input.to;
        }
         if(this.su_input.from!="" && this.su_input.to!=""){
          this.su.intervals[0].from = this.su_input.from; 
          this.su.intervals[0].to = this.su_input.to;
        }
        this.openingHours = [];
        this.openingHours.push(this.mo,this.tu,this.we,this.th,this.fr,this.sa,this.su);

        let newPlace = {
          name: this.name,
          address: {
            country: this.country,
            state: this.state,
            city: this.city,
            street: this.street,
            streetNum: this.streetNum
          },
          openingHours: this.openingHours
        }
        try{
          let responsePlace = await PlaceService.CreatePlace(newPlace); 
          this.savedPlaceId = responsePlace.id;   
          this.$buefy.toast.open({message:"Place has been saved", type: "is-success"});      
        } 
        catch(e){
          console.log(e);1
        }
      }
    },
  },
};
</script>

<style scoped>
.create_place {
  width: 70%;
}
.inputs {
  padding: 10px;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 0px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.addr_a {
  display: inline-flex;
}
h1 {
  font-size: 2rem;
}
.opening_hours{
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
}
.oh{
  margin-left: 3px;
  margin-right: 3px;
}
.resp{
  margin-top: 10px;

}
</style>