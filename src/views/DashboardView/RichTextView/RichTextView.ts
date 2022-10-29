import { Richtext } from "@root/lib/richtext/richtext";
import { IAppState } from "@root/types";
import { View } from "dhx-optimus";

export default class RichTextView extends View<IAppState> {
	richtext: Richtext;

	initialContent: string;

	init() {
		this.richtext = new (dhx as any).Richtext(null, {
			mode: "document",
			toolbarBlocks: [
				"undo",
				"style",
				"decoration",
				"colors",
				"align",
				"link",
				"clear",
				"fullscreen",
				"stats",
			],
		});

		this.initialContent =
			'<p style="text-align: right;">Date: October 11, 2021</p><p style="text-align: left;"></p><h1 style="text-align: center;">MEDICAL CERTIFICATE</h1><p style="text-align: left;"></p><p>This is to certify that Mr./Mrs./Ms. <strong>[Patient Name]</strong>, also known as <strong>[Title]</strong> at <strong>[Company Name]</strong>, has undergone medical treatment conducted at <strong>[Hospital Address]</strong> from <strong>[Start Date]</strong> to <strong>[End Date]</strong>.</p><p>The attending physician, Dr. <strong>[Doctor Name]</strong>, has advised that the individual should be allowed absence from their company duties for a period of <strong>[Number of Days]</strong> days starting from the day of leaving the hospital.</p><p></p><p style="text-align: right;"><strong>[Name]</strong></p><p style="text-align: right;"><strong>[Title]</strong></p>';

		this.richtext.setValue(this.initialContent, "html");

		return this.richtext;
	}
}
