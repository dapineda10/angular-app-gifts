import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Injectable, LOCALE_ID } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial:string[] = [];
  private apiKey:string = '89VXnQOukqARFaYWlzA2vKgAUQOn5Ftt';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  public resuldatos:Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient){
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    if(localStorage.getItem('resultados')){
      this.resuldatos = JSON.parse(localStorage.getItem('resultados')!);
    }
    
  }


  async buscarGifts(query:string){
    if(query.length <= 2)
      return

    //Si ya existe en el historial no se inserta de nuevo
    if(!this._historial.includes(query)){

    //Si sólo está buscando con 2 caracteres no hace nada si son mas caracteres si inserta
    if(this._historial.length  == 10){
      //Inserta en la primer posición y elimina el de la última posición
      this._historial.unshift(query);  
      this._historial.pop();
    }else{
      //Inserta en la primer posición
      this._historial.unshift(query);
    }

    localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    //Petición con  nativo
    /*const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=89VXnQOukqARFaYWlzA2vKgAUQOn5Ftt&limit=10&q=amigo');
    const data = await resp.json();
    console.log(data)*/

    const params = new HttpParams().set('api_key',this.apiKey).
    set('limit','10').
    set('q',query)
    
    //Peticiones con httpclient de angular, usando observable.
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search?`, {params})
    .subscribe((resp)=>{
      console.log(resp.data)
      this.resuldatos = resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resuldatos))
    })
    
  }
}
