import Link from "next/link";
import { Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:h-14">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Student Performance ML. Built by Vincent Oei.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Oeija/student-performance-ml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Code className="h-5 w-5" />
            <span className="sr-only">Backend GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
