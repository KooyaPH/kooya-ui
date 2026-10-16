// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useState } from "react"
import { Rating } from "../../../adapters/utility.tsx"
import { toast } from "../../../adapters/feedback.tsx"

export default function Pattern() {
  const [productRating, setProductRating] = useState(0)

  const handleRatingChange = (rating: number) => {
    setProductRating(rating)

    toast.success("Rated {rating} out of 5", {
      description: `Rated ${rating} out of 5`,
    })
  }

  return (
    <div className="space-y-8">
      <Rating
        rating={productRating}
        editable={true}
        onRatingChange={handleRatingChange}
        showValue={true}
      />
    </div>
  )
}
