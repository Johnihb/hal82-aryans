"use client"

import React from "react"
import Link from "next/link"

export default function NotFound() {
	return (
		<div className="min-h-screen bg-white flex items-center justify-center px-4">
			<div className="w-full max-w-2xl bg-white border border-gray-100 rounded-2xl shadow-lg p-10 text-center">
				<div className="mx-auto mb-6 w-28 h-28 flex items-center justify-center rounded-full bg-black/5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-14 h-14 text-black"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						aria-hidden
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75L7.5 12l2.25 2.25M14.25 9.75L16.5 12l-2.25 2.25" />
						<circle cx="12" cy="12" r="8" />
					</svg>
				</div>

				<div className="mb-2">
					<span className="text-6xl md:text-7xl font-extrabold text-black">404</span>
				</div>

				<h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Page not found</h2>
				<p className="text-sm text-gray-600 max-w-xl mx-auto mb-6">
					We couldn’t find the page you’re looking for. It may have been moved or deleted.
				</p>

				<div className="flex items-center justify-center gap-3">
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-900 transition"
					>
						Go home
					</Link>

					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm text-gray-900 border border-gray-200 hover:bg-gray-50 transition"
					>
						Contact us
					</Link>
				</div>

				<p className="text-xs text-gray-400 mt-6">If you think this is an error, please let us know.</p>
			</div>
		</div>
	)
}

