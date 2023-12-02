import Gallery from "@/components/Gallery";

export default function Home() {
  return (
      <>
        <section className={"w-full flex-center"}>
          <h1 className={"head_text text-center mb-5"}>Image</h1>
          <Gallery/>
        </section>
      </>
  )
}
