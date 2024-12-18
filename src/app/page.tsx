import { Gallery } from "@/components/Gallery"
import { Header } from "@/components/Header"
import { StatusBar } from "@/components/Status-bar"
import { client } from "@/sanity/lib/client"
import { IMAGE_QUERY } from "@/sanity/lib/queries"

export default async function Page() {

  const imagesData = await client.fetch(IMAGE_QUERY)

  return (
    <div className="min-h-screen bg-[#2A0944] text-white">
      <div className="mx-auto max-w-7xl p-4">
        <div className="rounded-lg border border-[#FF69B4] bg-[#3B185F] shadow-lg overflow-hidden">
          <Header title="Yeah, Baby! The Austin Powers Gallery" email="jmariwyatt@gmail.com" />
          <Gallery imagesData={imagesData} />
          <StatusBar itemCount={imagesData.length} />
        </div>
      </div>
    </div>
  )
}

