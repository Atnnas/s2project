import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in .env.local");
  process.exit(1);
}

const ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageUrl: String,
  date: String,
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const projects = [
  {
    title: "Editorial Vogue",
    category: "Fotografía",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKWHogpKAR4YiNUKds9jcAgsBL_F2chFCOEgjKmdSgoqs8HpbkrgS34egfsFyN6hJjBjN3SPVnp0zEO3Tq2fI7vhuvhBt930v8ahZ4mZ97QnBO8L2sAXQbooVYlc0LmRr3OgNjdfRmm67KNVufVDr4FIr-MNtwbl2ngCb3BO9V1kGateUuxTjMtPAoNlg-4KoZtTr-CEMzR-8UeO6YPg-AyUdVp3MAv7a7CNZs1YBCu0Qg-ffiKr767qwuf3Nn-kMeJt-nR_dTXw"
  },
  {
    title: "El Pabellón de Cristal",
    category: "Fotografía",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO-nVeFz7LKmeQ1p6iNeQlJqJ1x6NOy-DSGeHIxmb3A2zgz0636Zk_Vh6Nr6HkGJGPBV--mJWXAU5zyULOM8rJScJEhZ_Vhaqq9cMs-J7Qmn90tHhN1UI8rDDOajr8JfG8WoQ9eKI6TQPwYjFrTiFviNA_3jlzvlpPVzVSsJ3gf3GzGZqP6PAWlwB05HJluCxlABhvDi42Uxzo_n7IDaX_kGGcVWyh3yjdJbGEQ5Nx7Ww0NtkC27xzqHbL7VGEU6201fJIb8hoeA"
  },
  {
    title: "Lujo Atemporal",
    category: "Fotografía",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtf1NXoxSwuzXQcIgAXoVLnPZNHvCJ344ttV7dVhWLLae22Au8k2TYWbjn6-P4eSZUMARHntxRJUtgIIhKkSeMivY_c1CEjctJkfazl3iFGEx-m3X3PcmnTbwrGYEiawDUQjaE_GM3Et92h5kxgY06uXN0Gaq1kKlKQVkYBCAtpsOg3PC0TNasM-9LaWgn1aitP2_r3-tEaXt5edBHXVjKNyzmfIYEeQs4Unl6_sa1UCOdk_jLF5QkuX0nOzkDiniAEAMXPL91jw"
  },
  {
    title: "Ritmo Urbano",
    category: "Reels",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmTG3UV75F3Jy9hrFvIuMYwkMfr_RNbNabWpfuuYz2sATq86GXnEZxjffDNWblRJwqa0s5t7jKINthhK28MIl5EpOCg2lsug2vZA2ljbNTCU38BdGDGlNnO6ylRvXLHwaAGq1VdCsUn0d7jMwJ60EJYvy6gUix3ZpxBoqK6aHgqFjh-0FDWzI97IX7UYvXF93UY74q5G29cGrXaLMRl-NZio2pDZ7zAFe9oSusTkIyHaeutvhHbtdAqjdIz_OaggGNB6YBsEv1LA"
  },
  {
    title: "Velocidad y Movimiento",
    category: "Reels",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz6dXiUi6qZKrFc9-qWoAaP1Skd3Vxc6Ri2oxIJb5laFCAhAxakNPH6BOtb95xb-RjvoDCY2Fg_6G8Wi0xTyv5m-whzFRBE62MrcgU4p4QI3moF0plV49XmXKGmONdOk1KMO89s4j8kgRd_gLMBZzCCx1Bux4_5-CQyOI5lehQMsVyC3M9FrqMRTgdtNbC0OTYiF7bME8YWyKDzAbFlxx-gA4E0u20RJs5CGDNsVzFMiGK-RJfKq1tfRHy8WiV3qXZmWhxI0tmFQ"
  },
  {
    title: "Hora Dorada",
    category: "Reels",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWGygFo2YzfjAfBPAwlwF-vz3UihJdOTTnRbzqA5xClfu6pU_xsZAps6uB5AjEH5rjntS7COnMtvubXf9JHcvZFsCbzM-49zQDP19oKlWGhzgrrNi6Jj3WKz7XBXHCs6yTxI4i9FBWwHodTXvKgl1862cehgKfR_to2E8gjsogQVpI7PM0ihoakBXtldaDIbJd07Tkm3dueEb277icLI-lKlLF6IHosK7bK_CUrU-w-IwrJyPsG52bHZvFr0dNHY9XcI1XV_Tasg"
  },
  {
    title: "La Historia del Tostado",
    category: "Reels",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMoJEQVqxXnEHrSnHcub-DRDKMtmsfjbdZf6CuYztI63A0Z2Ln_ZuGCE83gBaTjC_rUHXlQm8o6AmZxJPiHqlbjq4x49nt2ttSPstnXRzcNbxdlh4wsTQCHwyMXAEGuZ31dwG00W68pECddEcGiCSQR97mC_FJWiQEsP81QE_RJI_KZqsAG1Cr8avNpG6jtFOiCPWRElWYX-oejsc0JMpm0Wx2vJ5TFu5W05NqQEFoPpLLrDfjq9mVeJ0OzZI3JwBPwqOhsZinXg"
  },
  {
    title: "Identidad Lumina Tech",
    category: "Arte Digital",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-68XnXqbgzZNt0DAtaLlYQKwtqNCFNwPaSI97Vun6yRle3htXmyFdUiLK0ty6nfcKuXGMoGMzIS6gwpC5jxjliMfGn069yH6qrNeVHTET20aZQrkE46ZNUprTM47dQ720W8zLE-S-unwKCMMGbg440nE2UK22Rh_Ck_7z5buHX0P-F_Eu6y2bdHTx1QHwxaSoQMaVfu5FA2G3ttygPiK2b1q1hCGlU-sAkixrZps23uSL0nOVs_UqnSjK8PoXmuXA6n-K6ovc4Q"
  },
  {
    title: "Concepto Nexus OS",
    category: "Arte Digital",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATsi3cJcXm8OW5CbivrjqOHx0ZiR3-JX5TEKVkYWi0qsqrQC-wIe-1HHyRTPqZ2BOH8VHJvBTWdS2eBtYgMiHWNrRB0Xw3peeeBckt2oyOviPO_WVP2pqCbyZn-Jj3qIB6T7agwVvgpiKDLjwvzrmDMYrqOTQLom-FG4w8puHdiU6JEqZpxhL4qlvkFOSK6Zwrr5ERmopGK9UNLYTshdJsjLCV2uC_8NgrAnjVt4kzno1BsOxzEPyQc02ZY51nCVqViuYwknCAzw"
  }
];

async function seed() {
  console.log("Connecting to MongoDB directly...");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully. Clearing old data...");
    await Project.deleteMany({});
    
    console.log("Inserting new data...");
    await Project.insertMany(projects);
    console.log("✓ Seeding complete.");
  } catch (e) {
    console.error("Database error:", e);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
