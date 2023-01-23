

export const isEmpty = (txt: string | any | null | undefined) => {
    return txt == undefined || txt == null || txt?.length == 0;
}


/**
 * token:     description:             example:
 * #YYYY#     4-digit year             1999
 * #YY#       2-digit year             99
 * #MMMM#     full month name          February
 * #MMM#      3-letter month name      Feb
 * #MM#       2-digit month number     02
 * #M#        month number             2
 * #DDDD#     full weekday name        Wednesday
 * #DDD#      3-letter weekday name    Wed
 * #DD#       2-digit day number       09
 * #D#        day number               9
 * #th#       day ordinal suffix       nd
 * #hhhh#     2-digit 24-based hour    17
 * #hhh#      military/24-based hour   17
 * #hh#       2-digit hour             05
 * #h#        hour                     5
 * #mm#       2-digit minute           07
 * #m#        minute                   7
 * #ss#       2-digit second           09
 * #s#        second                   9
 * #ampm#     "am" or "pm"             pm
 * #AMPM#     "AM" or "PM"             PM
 * @param date Date object
 * @param formatString pattern
 * @returns formatted date
 */
export const formatDateString = (date: Date, formatString: string) => {
    var YYYY,
        YY,
        MMMM,
        MMM,
        MM,
        M,
        DDDD,
        DDD,
        DD,
        D,
        hhhh,
        hhh,
        hh,
        h,
        mm,
        m,
        ss,
        s,
        ampm,
        AMPM,
        dMod,
        th
    YY = ((YYYY = date.getFullYear()) + '').slice(-2)
    MM = (M = date.getMonth() + 1) < 10 ? '0' + M : M
    MMM = (MMMM = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ][M - 1]).substring(0, 3)
    DD = (D = date.getDate()) < 10 ? '0' + D : D
    DDD = (DDDD = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ][date.getDay()]).substring(0, 3)
    th =
        D >= 10 && D <= 20
            ? 'th'
            : (dMod = D % 10) == 1
                ? 'st'
                : dMod == 2
                    ? 'nd'
                    : dMod == 3
                        ? 'rd'
                        : 'th'
    formatString = formatString
        .replace('#YYYY#', YYYY.toString())
        .replace('#YY#', YY)
        .replace('#MMMM#', MMMM)
        .replace('#MMM#', MMM)
        .replace('#MM#', MM.toString())
        .replace('#M#', M.toString())
        .replace('#DDDD#', DDDD)
        .replace('#DDD#', DDD)
        .replace('#DD#', DD.toString())
        .replace('#D#', D.toString())
        .replace('#th#', th)
    h = hhh = date.getHours()
    if (h == 0) h = 24
    if (h > 12) h -= 12
    hh = h < 10 ? '0' + h : h
    hhhh = hhh < 10 ? '0' + hhh : hhh
    AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase()
    mm = (m = date.getMinutes()) < 10 ? '0' + m : m
    ss = (s = date.getSeconds()) < 10 ? '0' + s : s
    return formatString
        .replace('#hhhh#', hhhh.toString())
        .replace('#hhh#', hhh.toString())
        .replace('#hh#', hh.toString())
        .replace('#h#', h.toString())
        .replace('#mm#', mm.toString())
        .replace('#m#', m.toString())
        .replace('#ss#', ss.toString())
        .replace('#s#', s.toString())
        .replace('#ampm#', ampm)
        .replace('#AMPM#', AMPM)
}