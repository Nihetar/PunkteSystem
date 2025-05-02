import { BrustDto, GrundfertigkeitenDto, KraulDto, RueckenDto, SchwimmerDto } from "../SchwimmerDto";

export function calculatePointsForSwimmer(dto: SchwimmerDto): number {
  let total = 0;

  const gf: GrundfertigkeitenDto = dto.grundfertigkeiten;
  if (!gf.atmen) total += 4;
  if (!gf.gleiten) total += 4;
  if (!gf.rollen) total += 4;
  if (!gf.springen) total += 4;
  if (!gf.tauchen) total += 4;
  if (!gf.drehen) total += 4;
  if (!gf.fortbewegen) total += 4;

  const bs: BrustDto = dto.brust;
  if (bs.beinSchere) total += 1;
  if (bs.armeNichtGestreckt) total += 1;
  if (bs.gabelFinger) total += 1;
  if (bs.keineSchwimmstrucktur) total += 1;
  if (bs.knieAnBrust) total += 1;
  if (bs.kopfFalsch) total += 1;

  const rw: RueckenDto = dto.ruecken;
  if (rw.armeNichtAmOhr) total += 1;
  if (rw.armeUnkoodiniert) total += 1;
  if (rw.armeUnterwasserFalsch) total += 1;
  if (rw.bauchUnten) total += 1;
  if (rw.beineNichtGestreckt) total += 1;
  if (rw.beineUnregelmaessig) total += 1;
  if (rw.huefteNichtGerade) total += 1;
  if (rw.kopfNichtGerade) total += 1;

  const kr: KraulDto = dto.kraul;
  if (kr.armeNichtGestreckt) total += 1;
  if (kr.armeUnkoodiniert) total += 1;
  if (kr.armeUnterwasserFalsch) total += 1;
  if (kr.atmungFalsch) total += 1;
  if (kr.beineNichtGestreckt) total += 1;
  if (kr.beineUnregelmaessig) total += 1;
  if (kr.kopfNichtGeradeNachUnten) total += 1;

  return total;
}
