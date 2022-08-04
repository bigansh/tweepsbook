import { NextApiRequest, NextApiResponse } from 'next'
import { TwitterApi } from 'twitter-api-v2'

const twtrClient = new TwitterApi(process.env.NEXT_PUBLIC_TWITTER_API_KEY)

/**
 * A function that sends the realtime data for the the tweets.
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse}} res
 */
export default async function fetchTweets(req, res) {
	const resp = await getTweets(req.body.ids)
	res.send(resp)

	// console.log(req.body)
}

const getTweets = async (ids) => {
	console.log(ids)
	if (ids.length === 0) {
		return []
	}

	// const fetchedTweets = await twtrClient.v2.tweets(ids, {
	// 	'media.fields': [
	// 		'duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics',
	// 	],
	// 	'user.fields': [
	// 		'id,name,profile_image_url,protected,url,username,verified',
	// 	],
	// 	'tweet.fields': [
	// 		'attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text',
	// 	],
	// 	expansions: [
	// 		'author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id',
	// 	],
	// })

	const queryParams = new URLSearchParams({
		ids: ids.join(','),
		expansions:
			'author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id',
		'tweet.fields':
			'attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text',
		'user.fields':
			'id,name,profile_image_url,protected,url,username,verified',
		'media.fields':
			'duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics',
	})

	const response = await fetch(
		`https://api.twitter.com/2/tweets?${queryParams}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITTER_API_KEY}`,
			},
		}
	)

	const tweets = await response.json()

	const getAuthorInfo = (author_id) => {
		return tweets?.includes?.users?.find((user) => user?.id === author_id)
	}

	const getReferencedTweets = (mainTweet) => {
		return (
			mainTweet?.referenced_tweets?.map((referencedTweet) => {
				const fullReferencedTweet = tweets?.includes?.tweets?.find(
					(tweet) => tweet?.id === referencedTweet?.id
				)

				return {
					type: referencedTweet?.type,
					author: getAuthorInfo(fullReferencedTweet?.author_id),
					...fullReferencedTweet,
				}
			}) || []
		)
	}

	return (
		tweets?.data?.reduce((allTweets, tweet) => {
			const tweetWithAuthor = {
				...tweet,
				media:
					tweet?.attachments?.media_keys?.map((key) =>
						tweets?.includes?.media?.find(
							(media) => media?.media_key === key
						)
					) || [],
				referenced_tweets: getReferencedTweets(tweet),
				author: getAuthorInfo(tweet?.author_id),
			}

			return [tweetWithAuthor, ...allTweets]
		}, []) || []
	)
}
