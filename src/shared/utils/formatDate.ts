import moment from 'moment'

export const formatDate = (date: string, format = 'DD MMM YYYY') => {
  if (date && date.toString().length > 0) {
    return moment(date).format(format)
  } else return date
}
