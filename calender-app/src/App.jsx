import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./utils/calendar";
import cn from "./utils/cn";
import events from "./utils/events";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendar() {
	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);

	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<header className="bg-blue-600 text-white text-center py-4 text-2xl font-bold">
				Calendar
			</header>

			{/* Main content */}
			<main className="flex flex-1 flex-col lg:flex-row">
				{/* Calendar Section */}
				<div className="w-full lg:w-1/2 border-r p-4 overflow-y-auto">
					{/* Month Navigation */}
					<div className="flex justify-between items-center mb-4">
						<h1 className="select-none font-semibold text-lg">
							{months[today.month()]}, {today.year()}
						</h1>
						<div className="flex gap-6 items-center">
							<GrFormPrevious
								className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
								onClick={() => {
									setToday(today.month(today.month() - 1));
								}}
							/>
							<h1
								className="cursor-pointer hover:scale-105 transition-all text-blue-600"
								onClick={() => {
									setToday(currentDate);
								}}
							>
								Today
							</h1>
							<GrFormNext
								className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
								onClick={() => {
									setToday(today.month(today.month() + 1));
								}}
							/>
						</div>
					</div>

					{/* Days of Week */}
					<div className="grid grid-cols-7 text-center text-gray-500 font-medium mb-2">
						{days.map((day, index) => (
							<div key={index}>{day}</div>
						))}
					</div>

					{/* Dates */}
					<div className="grid grid-cols-7 gap-1">
						{generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
							const isSelected = selectDate.toDate().toDateString() === date.toDate().toDateString();
							const dayEvents = events.filter(event => event.date === date.format("YYYY-MM-DD"));

							return (
								<div key={index} className="p-1 text-center h-16 relative">
									<div
										className={cn(
											currentMonth ? "" : "text-gray-400",
											today ? "bg-blue-600 text-white" : "",
											isSelected ? "bg-black text-white" : "",
											"h-10 w-10 mx-auto rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
										)}
										onClick={() => setSelectDate(date)}
									>
										{date.date()}
									</div>

									{/* Dot if event exists */}
									{dayEvents.length > 0 && (
										<div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
									)}
								</div>
							);
						})}
					</div>
				</div>

				{/* Events Section */}
				<div className="w-full lg:w-1/2 p-4 overflow-y-auto">
					<h1 className="font-semibold text-lg mb-3">
						Schedule for {selectDate.toDate().toDateString()}
					</h1>
					{events.filter(event => event.date === selectDate.format("YYYY-MM-DD")).length === 0 ? (
						<p className="text-gray-400">No meetings for today.</p>
					) : (
						<ul className="space-y-2 text-sm">
							{events
								.filter(event => event.date === selectDate.format("YYYY-MM-DD"))
								.map((event, idx) => (
									<li key={idx} className="border p-3 rounded shadow-sm hover:bg-gray-100 transition">
										<div className="font-semibold text-blue-600">{event.title}</div>
										<div>Time: {event.time}</div>
										<div>Duration: {event.duration}</div>
									</li>
								))}
						</ul>
					)}
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-gray-100 text-center text-sm text-gray-600 py-3">
				© {new Date().getFullYear()} Built by Akash Santhosh
			</footer>
		</div>
	);
}
