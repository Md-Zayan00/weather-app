
//exports
export default function randomComments(isTempUp: boolean): string{
    const goodComments: string[] = [
        "The air is feeling crisp and refreshed today—perfect weather to grab a warm coffee!",
        "Things are cooling off nicely out there. Time to bring out your favourite comfortable sweater!",
        "A welcome break from the intense heat! Enjoy this beautiful, cool breeze while it lasts.",
        "The temperature has dropped, making it the perfect excuse for a relaxing, cozy night indoors.",
        "It is beautifully brisk today—ideal weather for a brisk walk or an outdoor workout without overheating.",
        "A cool down is finally here! Nature is giving us a chance to breathe easy and recharge today.",
        "Perfect sweater weather has arrived. Enjoy the fresh, crisp air out there this afternoon!",
        "The heat is finally backing down, leaving us with a wonderfully refreshing and clear day ahead.",
        "Things have cooled down quite a bit, making it a fantastic evening to open the windows for fresh air.",
        "It is a bit chilly out there today, but it is the perfect excuse to get cozy with a hot cup of tea!"
    ]
    const badComments: string[] = [
        "The temperature is climbing today, but look on the bright side—it is a beautiful day for some sunshine!",
        "It is heating up out there! Remember to stay hydrated and take it easy under the sun today.",
        "The warmth is making a strong comeback! Grab your sunglasses and enjoy the bright, sunny vibes.",
        "Things are warming up nicely today—a perfect excuse to find some shade and enjoy a cold drink.",
        "It is getting quite warm out there, so make sure to seek out some air conditioning or a cool fan!",
        "Summer is showing its strength today! Keep your water bottle close by and stay beautifully cool.",
        "The temperature has jumped, making it the ultimate day to head poolside or enjoy the shade.",
        "It is noticeably warmer out there today—don't forget your sunscreen if you are heading outdoors!",
        "A wave of bright warmth is hitting us today. Take things slow, pace yourself, and enjoy the sunny skies.",
        "The weather is heating up, but a cool evening is always just around the corner. Stay refreshed!"
    ]

    if(isTempUp){
        const mathIndex = Math.floor(Math.random() * badComments.length)
        return badComments[mathIndex] 
    } else{
        const mathIndex = Math.floor(Math.random() * goodComments.length)
        return goodComments[mathIndex]
    }
}