import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

/**
 * A function to check the if the email address is a temporary email address.
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function emailChecker(req, res) {
	if (!req.body.email)
		res.status(500).send({ message: 'Please enter a valid email address.' })

	const response = await axios.get(
		`https://disposable.debounce.io/?email=${req.body.email}`
	)

	res.status(200).send(response.data)
}
