import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from 'src/app/users/token-storage.service';
import { Apartment } from '../apartment.model';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-apartment-create',
  templateUrl: './apartment-create.component.html',
  styleUrls: ['./apartment-create.component.scss']
})
export class ApartmentCreateComponent {

  @Output() onApartmentAdded = new EventEmitter();

  show: boolean = false;
  displayCreateForm: boolean = false;

  cities = ["Assen", "Drenthe", "Coevorden", "Emmen", "Hoogeveen", "Meppel", "Almere", "Flevoland", "Biddinghuizen", "Emmeloord", "Lelystad", "Bolsward	", "Friesland", "Dokkum", "Franeker", "Harlingen", "Hindeloopen", "IJlst", "Leeuwarden", "Sloten", "Sneek", "Stavoren", "Workum", "Apeldoorn	", "Gelderland", "Arnhem", "Bredevoort", "Buren", "Borculo", "Culemborg", "Dieren", "Doetinchem", "Ede", "Elburg", "Enspijk", "Gendt", "Groenlo", "Harderwijk", "Hattem", "Heukelum", "Huissen", "Nijkerk", "Nijmegen", "Staverden", "Tiel", "Ulft", "Voorst", "Wageningen", "Wijchen", "Winterswijk", "Zaltbommel", "Zevenaar", "Zutphen", "Appingedam	", "Groningen", "Delfzijl", "Groningen", "Hoogezand-Sappemeer", "Stadskanaal", "Veendam", "Winschoten", "Echt	", "Limburg", "Geleen", "Gennep", "Heerlen", "Kerkrade", "Tegelen", "Kessel", "Landgraaf", "Maastricht", "Montfort", "Nieuwstadt", "Roermond", "Schin op Geul", "Sittard", "Stein", "Susteren", "Thorn", "Vaals", "Valkenburg", "Venlo", "Weert", "North Brabant", "Bergen op Zoom", "Boxtel", "Breda", "Eindhoven", "Geertruidenberg", "Geldrop", "Grave", "Helmond", "Heusden", "Klundert", "Oosterhout", "Oss", "Ravenstein", "Roosendaal", "Sint-Oedenrode", "Tilburg", "Valkenswaard", "Veldhoven", "Waalwijk", "Willemstad", "Woudrichem", "Alkmaar	", "North Holland", "Amsterdam", "Den Helder", "Edam", "Enkhuizen", "Haarlem", "Heerhugowaard", "Hilversum", "Hoorn", "Laren", "Medemblik", "Monnickendam", "Muiden", "Naarden", "Purmerend", "Schagen", "Velsen", "Volendam", "Weesp", "Zaanstad", "Almelo	", "Overijssel", "Blokzijl", "Deventer", "Enschede", "Genemuiden", "Hardenberg", "Hasselt", "Hengelo", "Kampen", "Oldenzaal", "Rijssen", "Steenwijk", "Vollenhove", "Zwolle", "Alphen aan den Rijn	", "South Holland", "Capelle aan den IJssel", "Delft", "Dordrecht", "Gorinchem", "Gouda", "The Hague (Den Haag)", "Leiden", "Maassluis", "Rotterdam", "Schiedam", "Spijkenisse", "Vlaardingen", "Voorburg", "Zoetermeer", "Amersfoort	", "Utrecht", "Baarn", "Bunschoten", "Eemnes", "Hagestein", "Houten", "Leerdam", "Montfoort", "Nieuwegein", "Oudewater", "Rhenen", "Utrecht", "Veenendaal", "Vianen", "Wijk bij Duurstede", "Woerden", "IJsselstein", "Zeist", "Arnemuiden	", "Zeeland", "Goes", "Hulst", "Middelburg", "Sluis", "Terneuzen", "Veere", "Vlissingen", "Zierikzee"].sort();

  constructor(public apartmentsService: ApartmentsService, private tokenStorage: TokenStorageService) {
    // this will create a new property apartmentsService in this class
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log("error");
      return;
    }

    const new_apartment: Apartment =
    {
      name: form.value.name,
      description: form.value.description,
      city: form.value.city,
      address: form.value.address,
      price: form.value.price,
      maxvisitors: form.value.maxvisitors,
      ownerid: this.tokenStorage.getMyId(),
    }
    this.apartmentsService.addApartment(new_apartment).subscribe((apartment) => this.onApartmentAdded.emit(null));
  }
}