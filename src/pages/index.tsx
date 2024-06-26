import { Card } from "@/components/Card"
import { CardButton } from "@/components/CardButton"
import { useGlobalShortcut } from "@/hooks/tauri/shortcuts"
import { invoke } from "@tauri-apps/api/tauri"
import type { NextPage } from "next"
import { useCallback, useState } from "react"


const Home: NextPage = () => {
  const [buttonDesc, setButtonDesc] = useState<string>(
    "Waiting to be clicked. This calls 'on_button_clicked' from Rust.",
  )
  const onButtonClick = () => {
    invoke<string>("on_button_clicked")
      .then((value) => {
        setButtonDesc(value)
      })
      .catch(() => {
        setButtonDesc("Failed to invoke Rust command 'on_button_clicked'")
      })
  }

  const shortcutHandler = useCallback(() => {
    console.log("Ctrl+P was pressed!")
  }, [])
  useGlobalShortcut("CommandOrControl+P", shortcutHandler)

  return (
    <main className="flex-1 p-6">
      <h1 className="m-0 text-center text-6xl">
        Welcome to{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline focus:underline active:underline"
        >
          Next.js!
        </a>
      </h1>

      <p className="my-12 text-center text-2xl leading-9">
        Get started by editing{" "}
        <code className="rounded-md bg-gray-200 p-2 font-mono text-xl">
          src/pages/index.tsx
        </code>
      </p>

      <div className="flex max-w-3xl flex-wrap items-center justify-center">
        <Card
          url="https://nextjs.org/docs"
          title="Documentation"
          description="Find in-depth information about Next.js features and API."
        />

        <Card
          url="https://nextjs.org/learn"
          title="Learn"
          description="Learn about Next.js in an interactive course with quizzes!"
        />

        <Card
          url="https://github.com/vercel/next.js/tree/canary/examples"
          title="Examples"
          description="Discover and deploy boilerplate example Next.js projects."
        />

        <CardButton
          onClick={onButtonClick}
          title="Tauri Invoke"
          description={buttonDesc}
        />
      </div>
    </main>
  )
}

export default Home
