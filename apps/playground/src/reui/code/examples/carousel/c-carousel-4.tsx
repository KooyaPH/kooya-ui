// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {localAsset} from "../../../adapters/assets.ts";
import { Card } from "../../../adapters/layout.tsx"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../adapters/navigation.tsx"

export default function Pattern() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-3xl"
    >
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <Card className="relative aspect-3/4 overflow-hidden border-0 p-0">
                <img
                  src={localAsset(`https://picsum.photos/600/800?grayscale&random=${index + 15}`)}
                  alt={`Slide ${index + 1}`}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:inline-flex" />
      <CarouselNext className="hidden sm:inline-flex" />
    </Carousel>
  )
}
