/**
 * "Lepas Kerja" KL skyline silhouette pinned to the bottom of the hero.
 * Two layers for depth: a faint distant row of blocks behind, and a
 * foreground skyline with Merdeka 118, the Petronas Twin Towers (with
 * skybridge), Menara KL, and Exchange 106. Dark mode only; sits behind
 * hero content, above the starfield.
 */
export default function NightSilhouette() {
  return (
    <div
      // bottom-4 = the hero's pb-4, so the skyline ends at the curve divider's
      // bottom edge (the horizon) instead of spilling into the padding below it
      className="pointer-events-none absolute inset-x-0 bottom-4 hidden dark:block"
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="block h-32 w-full sm:h-52"
      >
        {/* Distant blocks */}
        <path
          fill="#223a63"
          opacity="0.45"
          d="M20,200 L20,132 L80,132 L80,200 Z
             M110,200 L110,124 L180,124 L180,200 Z
             M320,200 L320,114 L390,114 L390,200 Z
             M470,200 L470,130 L540,130 L540,200 Z
             M590,200 L590,110 L640,110 L640,200 Z
             M760,200 L760,116 L820,116 L820,200 Z
             M900,200 L900,108 L960,108 L960,200 Z
             M1060,200 L1060,120 L1130,120 L1130,200 Z
             M1220,200 L1220,112 L1290,112 L1290,200 Z
             M1370,200 L1370,126 L1440,126 L1440,200 Z"
        />
        {/* Foreground skyline */}
        <path
          fill="#0e2038"
          opacity="0.95"
          d="M0,200 L0,144 L28,144 L28,200 Z
             M40,200 L40,152 L96,152 L96,200 Z
             M170,200 L170,140 L182,140 L182,110 L192,110 L192,84 L200,84 L203,68 L205,50 L207,68 L210,84 L218,84 L218,110 L228,110 L228,140 L240,140 L240,200 Z
             M270,200 L270,136 L322,136 L322,200 Z
             M348,200 L348,162 L398,162 L398,200 Z
             M430,200 L430,142 L460,142 L466,136 L496,136 L496,200 Z
             M520,200 L520,126 L570,126 L570,200 Z
             M630,200 L630,96 L636,96 L636,74 L642,74 L642,56 L648,56 L648,40 L653,40 L655,16 L657,40 L662,40 L662,56 L668,56 L668,74 L674,74 L674,96 L680,96 L680,200 Z
             M680,118 L720,118 L720,124 L680,124 Z
             M690,124 L686,146 L690,146 L694,124 Z
             M710,124 L706,146 L710,146 L714,124 Z
             M720,200 L720,96 L726,96 L726,74 L732,74 L732,56 L738,56 L738,40 L743,40 L745,16 L747,40 L752,40 L752,56 L758,56 L758,74 L764,74 L764,96 L770,96 L770,200 Z
             M800,200 L800,138 L850,138 L850,200 Z
             M872,200 L872,158 L920,158 L920,200 Z
             M948,200 L956,140 L956,102 L950,102 L950,88 L972,88 L972,102 L966,102 L966,140 L974,200 Z
             M959,88 L959,60 L963,60 L963,88 Z
             M1000,200 L1000,132 L1052,132 L1052,200 Z
             M1100,200 L1100,106 L1094,106 L1094,94 L1146,94 L1146,106 L1140,106 L1140,200 Z
             M1170,200 L1170,142 L1224,142 L1224,200 Z
             M1250,200 L1250,162 L1304,162 L1304,200 Z
             M1330,200 L1330,134 L1388,134 L1388,200 Z
             M1408,200 L1408,156 L1440,156 L1440,200 Z"
        />
      </svg>
    </div>
  );
}
