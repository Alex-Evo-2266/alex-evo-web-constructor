import { WidgetSchema } from "../../lib/types/schema";
import { useResolvedData } from "../../lib/hooks/useResolvedData";
import { useDashboard } from "../../lib/providers/DashboardProvider";
import { ActionExecutor } from "../../lib/core/actions/ActionExecutor";
import { Button, Card } from "alex-evo-sh-ui-kit";

const styles: any = {
    card: (on: boolean) => ({
        background: on
            ? "linear-gradient(135deg, #1e293b, #0f172a)"
            : "linear-gradient(135deg, #111827, #0b1220)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 16,
        color: "white",
        width: 260,
        boxShadow: on
            ? "0 0 20px rgba(59,130,246,0.25)"
            : "0 0 10px rgba(0,0,0,0.3)",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        gap: 12,
    }),

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    titleBlock: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
    },

    title: {
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 0.3,
    },

    subtitle: {
        fontSize: 11,
        opacity: 0.6,
    },

    statusDot: (on: boolean) => ({
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: on ? "#22c55e" : "#ef4444",
        boxShadow: on
            ? "0 0 10px #22c55e"
            : "0 0 10px #ef4444",
    }),

    valueBlock: {
        display: "flex",
        alignItems: "baseline",
        gap: 6,
    },

    value: {
        fontSize: 28,
        fontWeight: 700,
    },

    unit: {
        fontSize: 12,
        opacity: 0.6,
    },

    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    button: (on: boolean) => ({
        padding: "6px 12px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 600,
        background: on ? "#ef4444" : "#3b82f6",
        color: "white",
    }),

    smallMeta: {
        fontSize: 11,
        opacity: 0.5,
    },
};

export function SmartDeviceWidget({
    widget,
}: {
    widget: WidgetSchema<{
        title: string;
        icon?: string;
    }>;
}) {
    const { store, events, modals } = useDashboard();

    const state = useResolvedData(widget.data?.state);
    const value = useResolvedData(widget.data?.value);
    const subtitle = useResolvedData(widget.data?.subtitle);

    const executor = new ActionExecutor(store, events, modals);

    const isOn = String(state) === "ON";

    return (
        <Card header={widget.props?.title ?? "Device"} subhead={subtitle ?? "Smart device"}>
            <div style={styles.valueBlock}>
                <div style={styles.value}>
                    {value ?? "--"}
                </div>
                <div style={styles.unit}>
                    {widget.data?.unit ? "unit" : ""}
                </div>
            </div>
            <div style={styles.footer}>
                <Button 
                    size="small"
                    onClick={() =>
                        executor.executeMany(widget.actions)
                    }
                >
                    {isOn ? "Turn OFF" : "Turn ON"}
                </Button>

                <div style={styles.smallMeta}>
                    {isOn ? "Active" : "Inactive"}
                </div>
            </div>
        </Card>
        // <div style={styles.card(isOn)}>
        //     {/* HEADER */}
        //     <div style={styles.header}>
        //         <div style={styles.titleBlock}>
        //             <div style={styles.title}>
        //                 {widget.props?.title ?? "Device"}
        //             </div>
        //             <div style={styles.subtitle}>
        //                 {subtitle ?? "Smart device"}
        //             </div>
        //         </div>

        //         <div style={styles.statusDot(isOn)} />
        //     </div>

        //     {/* VALUE */}
        //     <div style={styles.valueBlock}>
        //         <div style={styles.value}>
        //             {value ?? "--"}
        //         </div>
        //         <div style={styles.unit}>
        //             {widget.data?.unit ? "unit" : ""}
        //         </div>
        //     </div>

        //     {/* FOOTER ACTIONS */}
            // <div style={styles.footer}>
            //     <button
            //         style={styles.button(isOn)}
            //         onClick={() =>
            //             executor.executeMany(widget.actions)
            //         }
            //     >
            //         {isOn ? "Turn OFF" : "Turn ON"}
            //     </button>

            //     <div style={styles.smallMeta}>
            //         {isOn ? "Active" : "Inactive"}
            //     </div>
        //     </div>
        // </div>
    );
}