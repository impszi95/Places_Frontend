import axios from 'axios';
import API from '../Enviroment';

class PlaceService{
    async CreatePlace(newPlace){
        return await axios.post(API + '/places/create',newPlace)
        .then(response => {            
            return response.data;
        });
    }
    async GetPlace(placeId){
        return await axios.get(API + 'places/'+placeId).then(res=>{            
            return res.data;
        })        
    } 
}
export default new PlaceService();