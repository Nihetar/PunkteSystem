export interface GrundfertigkeitenDto {
    atmen: boolean;
    tauchen: boolean;
    gleiten: boolean;
    springen: boolean;
    rollen: boolean;
    drehen: boolean;
    fortbewegen: boolean;
  }
  
  export interface SchwimmstileDto {
    keinRuecken: boolean;
    keinKraul: boolean;
    keinBrust: boolean;
    grobRuecken: boolean;
    grobKraul: boolean;
    grobBrust: boolean;
  }
  
  export interface BrustDto {
    beinSchere: boolean;
    armeNichtGestreckt: boolean;
    kopfFalsch: boolean;
    knieAnBrust: boolean;
    gabelFinger: boolean;
    keineSchwimmstrucktur: boolean;
  }
  
  export interface RueckenDto {
    bauchUnten: boolean;
    kopfNichtGerade: boolean;
    huefteNichtGerade: boolean;
    armeNichtAmOhr: boolean;
    armeUnterwasserFalsch: boolean;
    beineNichtGestreckt: boolean;
    beineUnregelmaessig: boolean;
    armeUnkoodiniert: boolean;
  }
  
  export interface KraulDto {
    kopfNichtGeradeNachUnten: boolean;
    beineUnregelmaessig: boolean;
    beineNichtGestreckt: boolean;
    armeNichtGestreckt: boolean;
    armeUnterwasserFalsch: boolean;
    atmungFalsch: boolean;
    armeUnkoodiniert: boolean;
  }
  
  export interface SchwimmerDto {
    id: number;
    vorname: string;
    nachname: string;
    geburtsdatum: Date;
    gruppe: string;
    grundfertigkeiten: GrundfertigkeitenDto;
    schwimmstile: SchwimmstileDto;
    brust: BrustDto;
    ruecken: RueckenDto;
    kraul: KraulDto;
    punkte?: number;
  }
  