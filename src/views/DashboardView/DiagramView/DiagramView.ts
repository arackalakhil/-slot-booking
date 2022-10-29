import { View } from "dhx-optimus";
import { IAppState, IPersonalCard } from "@root/types";

import "./DiagramView.scss";

const template = ({ name, photo, post, phone, mail }: IPersonalCard) => `
    <div class="dhx_diagram_template_a_box dhx_diagram_template_a">
        <div class="dhx_diagram_template_a__inside">
            <div class="dhx_diagram_template_a__picture" style="background-image: url(${photo});"></div>
            <div class="dhx_diagram_template_a__body">
                <div class="dhx_diagram_template_a__title">${name}</div>
                <div class="dhx_diagram_template_a__row">
                    <span class="dhx_diagram_template_a__text">${post}</span>
                </div>
                <div class="dhx_diagram_template_a__row">
                    <span class="dhx_diagram_template_a__icon mdi mdi-cellphone-android"></span>
                    <span class="dhx_diagram_template_a__text">${phone}</span>
                </div>
                <div class="dhx_diagram_template_a__row">
                    <span class="dhx_diagram_template_a__icon mdi mdi-email-outline"></span>
                    <span class="dhx_diagram_template_a__text">
                        <a class="dhx_diagram_template_a__link" href="mailto:${mail}" target="_blank">${mail}</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
`;

class DiagramView extends View<IAppState> {
	diagram: any;

	init() {
		this.diagram = new (dhx as any).Diagram(null, {
			type: "org",
			defaultShapeType: "personalCard",
		});

		this.diagram.addShape("personalCard", {
			template,
			defaults: {
				height: 120,
				width: 330,
			},
		});

		this.diagram.data.parse(this.params.personal.serialize());

		this.diagram.events.on("shapeClick", (id: string) => {
			this.fire("selectPersonalId", [id]);
		});

		return this.diagram;
	}

	ready() {
		this.observe(
			state => state.selectedPersonalId,
			(id: string) => {
				if (id) {
					this.diagram.showItem(id);
					this.diagram.selection.add(id);
				} else {
					this.diagram.selection.add(null);
				}
			}
		);
	}

	destroy() {
		this.fire("selectPersonalId", [""]);
	}
}

export default DiagramView;
