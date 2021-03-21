<template>
  <div class="places">
    <h1>Details</h1>
    <div class="query">
      <b-input v-model="placeId" placeholder="PlaceId"></b-input>
      <b-button @click="GetPlace(placeId)" type="is-success"
        >Get place</b-button
      >
    </div>
    <div class="disp_place">
      <div v-if="name" class="left">
        <strong>{{ name }}</strong>
        <p>{{ country }}, {{ state }}</p>
        <p>{{ street }} {{ streetNum }}, {{ city }}</p>
      </div>
      <div v-if="name" class="right">
        <strong>Opening hours</strong>
        <div class="openingHour" v-for="openingHour in this.openingHoursPretty" :key="openingHour.day">
            <div class="days">
              <p v-if="openingHour.toDay!=''">{{ openingHour.fromDay }} - {{ openingHour.toDay}}</p>
            <p v-else>{{ openingHour.fromDay }}</p>
            </div>
            <div class="hours">
              <p v-if="!openingHour.open">closed</p>
              <div v-else v-for="interval in openingHour.intervals" :key="interval.from">
                <p>{{ interval.from.substring(0,5) }} - {{ interval.to.substring(0,5) }}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaceService from "@/service/PlaceService";

export default {
  data() {
    return {
      placeId: "",
      name: "",
      country: "",
      state: "",
      city: "",
      street: "",
      streetNum: 0,
      openingHours: [],
      openingHoursPretty:[]
    };
  },
  methods: {
    async GetPlace(placeId) {
      try {
        if(this.placeId == ""){
          return;
        }
        let place = await PlaceService.GetPlace(placeId);
        this.name = place.name;
        this.country = place.address.country;
        this.state = place.address.state;
        this.city = place.address.city;
        this.street = place.address.street;
        this.streetNum = place.address.streetNum;
        this.openingHours = place.openingHours;        

        this.openingHoursPretty = [];
        this.PrettifyOpeningHours();
      } catch (error) {
        console.log(error);
      }
    },
     PrettifyOpeningHours(){       
       let prevOpeningHour = {
         fromDay: this.openingHours[0].day, 
         toDay: "", 
         open: this.openingHours[0].open,
         intervals:this.openingHours[0].intervals};

       for(let i = 1;i<this.openingHours.length;i++){ 
         let currOpeningHour =  this.openingHours[i];
         if(this.Equals(prevOpeningHour, currOpeningHour))
         {
           prevOpeningHour.toDay = currOpeningHour.day;
         }
         else{           
           this.openingHoursPretty.push(prevOpeningHour);
           prevOpeningHour = {
             fromDay: currOpeningHour.day, 
             toDay: "", 
             open: currOpeningHour.open,
             intervals: currOpeningHour.intervals};
         }
       }
        this.openingHoursPretty.push(prevOpeningHour);
    },
    Equals(openingHour, otherOpeningHours){
      if(openingHour.open != otherOpeningHours.open){
        return false;
      }
      if(!openingHour.open && !otherOpeningHours.open){
        return true;
      }
      for(let i=0;i<openingHour.intervals.length;i++){
        if(openingHour.intervals[i].from != otherOpeningHours.intervals[i].from
           || openingHour.intervals[i].to != otherOpeningHours.intervals[i].to){
          return false;
        }
      }
      return true;
    }
  },
};
</script>

<style scoped>
.places {
  width: 80%;
}
h1 {
  font-size: 2rem;
}
.query {
  display: inline-flex;
  margin-bottom: 10px;
  margin-top: 10px;
}
.disp_place {
  display: flex;
  height: 300px;
  padding: 10px;
  background-color: rgb(216, 216, 216);
  box-shadow: 0 0px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 20px;
}
.left {
  background-color: rgb(255, 255, 255);
  text-align: left;
  width: 50%;
  margin-right: 6px;
  padding: 5px;
}
.right {
  background-color: rgb(255, 255, 255);
  text-align: left;
  width: 50%;
  margin-left: 6px;
  padding: 5px;
}
.openingHour{
  display: flex;
}
.days{
  width: 50%;
}
.hours{
  width: 50%;
  text-align:right;
}
</style>
