import { createCanvas, loadImage } from "canvas";
import { createImage } from "./image.js";
import { ssim } from "ssim.js";
import { write, writeFileSync } from "fs";

export const checkPost = async (auth, link) => {
    console.log(`Checking post ${link}`)
    const tweetId = getTweetId(link);

    if (!tweetId) {
        console.log("Invalid tweet link")
        return false
    }

    const tweet = await getTweet(tweetId)
    const entries = tweet?.data?.threaded_conversation_with_injections_v2?.instructions?.[0]?.entries || tweet?.data?.threaded_conversation_with_injections_v2?.instructions?.[1]?.entries

    if (!entries) {
        console.log("No entries found")
        return false
    }

    const entry = entries.find(entry => entry.entryId === `tweet-${tweetId}`)
    if (!entry) {
        console.log("No entry found")
        return false
    }


    const username = entry.content?.itemContent?.tweet_results?.result?.core?.user_results?.result?.legacy?.screen_name
    const quoted = entry.content?.itemContent?.tweet_results?.result?.quoted_status_result?.result?.rest_id

    if (!username || username !== auth.username) {
        console.log("Invalid username")
        return false
    }

    if (!quoted || quoted !== "1907548455779840058") {
        console.log("Invalid quoted tweet")
        return false
    }

    return true
}

const getTweetId = link => {
    const tweetRegex = /status\/(\d+)/
    if (!tweetRegex.test(link)) return null;
    return link.match(tweetRegex)[1];
}

const accountOptions = [
    {
        "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        "x-csrf-token": "9b98780e5e5d6c8d494d17e63a5ce910ba68191de88a7964835afb727f6c31d8ae680650087c0e874b26bce73a93a4eb1e3d586e9bea997216613b3d0e8a235ecf5c9fed5eaf4797d39c1f756ebf431b",
        "cookie": "auth_token=6c9d784f7c070e12ca20b0730dfa0b256904b500; ct0=9b98780e5e5d6c8d494d17e63a5ce910ba68191de88a7964835afb727f6c31d8ae680650087c0e874b26bce73a93a4eb1e3d586e9bea997216613b3d0e8a235ecf5c9fed5eaf4797d39c1f756ebf431b;"
    }
]

let lastChar = 65
export const getTweet = async (tweetId, currentAccount = 0) => {

    while (currentAccount < accountOptions.length) {
        var account = accountOptions[currentAccount]
        lastChar++
        if (lastChar > 80) lastChar = 65
        var options = {
            "headers": {
                ...account,
                "x-client-transaction-id": `b6IWacEbYZlCkXGeQ6RJnojBAQeEP2i9JKdYuhHKOaZZneNQcjMND4TdtBeBSIdIyBAT0WwTiFNmMifkexqCUD1iNqJMb${String.fromCharCode(lastChar)}`,

            },
            muteHttpExceptions: true
        }
        console.log(`Using account ${currentAccount + 1} - `)
        var resp = await fetch(`https://x.com/i/api/graphql/_8aYOgEDz35BrBcBal1-_w/TweetDetail?variables=%7B%22focalTweetId%22%3A%22${tweetId}%22%2C%22with_rux_injections%22%3Afalse%2C%22rankingMode%22%3A%22Relevance%22%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withVoice%22%3Atrue%7D&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Afalse%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticleRichContentState%22%3Atrue%2C%22withArticlePlainText%22%3Afalse%2C%22withGrokAnalyze%22%3Afalse%2C%22withDisallowedReplyControls%22%3Afalse%7D`, options)
        var respCode = resp.status

        if (respCode != 429) break
        if (respCode == 429) currentAccount++
        if (currentAccount >= accountOptions.length) {
            currentAccount = 0
            break
        }
    }

    if (resp.status != 200) {
        throw new Error(resp.statusText)
    }

    const json = await resp.json()

    return json
}

const getRedirectUrl = async (url) => {

    const resp = await fetch(url)

    return resp.url

}

export const checkRiddlePost = async (username, link) => {

    console.log(`Checking post ${link}`)
    const tweetId = getTweetId(link);

    if (!tweetId) {
        console.log("Invalid tweet link")
        return false
    }

    const tweet = await getTweet(tweetId)
    const entries = tweet?.data?.threaded_conversation_with_injections_v2?.instructions?.[0]?.entries

    if (!entries) {
        console.log("No entries found")
        return false
    }

    const entry = entries.find(entry => entry.entryId === `tweet-${tweetId}`)
    if (!entry) {
        console.log("No entry found")
        return false
    }

    writeFileSync("./tweet.json", JSON.stringify(entry, null, 2))

    const expandedUrl = entry.content?.itemContent?.tweet_results?.result?.legacy?.entities?.urls[0]?.expanded_url
    if (!expandedUrl) {
        console.log("No expanded url found")
        return false
    }

    if(!expandedUrl.includes(`https://link.tac.build/api/riddle-card?username=${username}`)) {
        console.log("Invalid expanded url")
        return false
    }

    return true


}