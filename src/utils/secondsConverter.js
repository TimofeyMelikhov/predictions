import moment from 'moment'

export const secondsConverter = seconds =>
	moment.utc(seconds * 1000).format('mm:ss')
