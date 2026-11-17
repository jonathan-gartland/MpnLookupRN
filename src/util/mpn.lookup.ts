import { getQt2KMpn, getQtLegio, getQtMpn, type Mpn } from 'mpn-lookup';

type WellCounts = { large: number; small: number };
type LegioMpn = ReturnType<typeof getQtLegio>;

/**
 * Looks up the MPN for a test type from its positive well counts.
 * QuantiTray and QuantiTray 2000 return [mpn, low, high]; Legiolert returns a single value.
 * Returns undefined for unknown test types or out-of-range counts.
 */
export function getMpn(testType: 'qt' | 'qt2k', inCount: WellCounts): Mpn;
export function getMpn(testType: 'legio', inCount: WellCounts): LegioMpn;
export function getMpn(testType: string, inCount: WellCounts): Mpn | LegioMpn;
export function getMpn(testType: string, inCount: WellCounts): Mpn | LegioMpn {
  switch (testType) {
    case 'qt':
      return getQtMpn(inCount.large);
    case 'qt2k':
      return getQt2KMpn(inCount.large, inCount.small);
    case 'legio':
      return getQtLegio(inCount.large, inCount.small);
    default:
      return undefined;
  }
}
