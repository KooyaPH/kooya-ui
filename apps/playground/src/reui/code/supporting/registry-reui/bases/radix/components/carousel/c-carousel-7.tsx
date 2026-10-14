import {localAsset} from "../../../../../../../adapters/assets.ts";
import { Card } from "../../../../../../../adapters/layout.tsx"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../../../../adapters/navigation.tsx"

export default function Pattern() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 pl-1">
            <div className="p-1">
              <Card className="relative aspect-square overflow-hidden border-0 p-0">
                <img
                  src={localAsset(`https://picsum.photos/600/600?grayscale&random=${index + 35}`)}
                  alt={`Slide ${index + 1}`}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
