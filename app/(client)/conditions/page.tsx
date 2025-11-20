'use client'

import { motion } from 'framer-motion'
import { FileText, AlertCircle, CreditCard, Calendar, XCircle, CheckCircle, Scale, Phone } from 'lucide-react'

export default function ConditionsPage() {
  const lastUpdate = "15 novembre 2024"

  const sections = [
    {
      icon: FileText,
      title: "1. Acceptation des conditions",
      content: [
        {
          text: "En accédant et en utilisant le site web de l'Hôtel Sept-Îles (ci-après \"le Site\") et en réservant nos services, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site ou nos services."
        },
        {
          subtitle: "Modifications des conditions",
          text: "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur le Site. Votre utilisation continue du Site après la publication des modifications constitue votre acceptation de ces modifications."
        }
      ]
    },
    {
      icon: Calendar,
      title: "2. Réservations",
      content: [
        {
          subtitle: "Processus de réservation",
          text: "Les réservations peuvent être effectuées :",
          list: [
            "En ligne via notre site web sécurisé",
            "Par téléphone au +1 (418) 962-2581",
            "Par email à reservations@hotel-sept-iles.ca"
          ]
        },
        {
          subtitle: "Confirmation de réservation",
          text: "Votre réservation sera confirmée dès réception :",
          list: [
            "Du paiement de l'acompte requis (généralement 30% du montant total)",
            "De vos informations complètes et exactes",
            "De votre acceptation de ces conditions générales"
          ]
        },
        {
          subtitle: "Disponibilité",
          text: "Toutes les réservations sont sous réserve de disponibilité. Nous nous réservons le droit de refuser toute réservation à notre entière discrétion."
        },
        {
          subtitle: "Âge minimum",
          text: "Les clients doivent être âgés d'au moins 18 ans pour effectuer une réservation. Une pièce d'identité avec photo sera demandée lors de l'enregistrement."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "3. Tarifs et paiement",
      content: [
        {
          subtitle: "Tarification",
          text: "Les tarifs affichés sur notre site sont :",
          list: [
            "En dollars canadiens (CAD)",
            "Par chambre et par nuit",
            "Taxes applicables en sus (TPS et TVQ)",
            "Sujets à modification sans préavis"
          ]
        },
        {
          subtitle: "Modalités de paiement",
          list: [
            "Acompte de 30% requis au moment de la réservation",
            "Solde payable à l'arrivée ou au départ",
            "Modes de paiement acceptés : cartes de crédit (Visa, Mastercard, American Express), cartes de débit",
            "Tous les paiements sont traités de manière sécurisée via notre partenaire Stripe"
          ]
        },
        {
          subtitle: "Frais supplémentaires",
          text: "Des frais supplémentaires peuvent s'appliquer pour :",
          list: [
            "Services de spa et soins",
            "Service en chambre",
            "Minibar et consommations",
            "Stationnement (si applicable)",
            "Animaux de compagnie (selon disponibilité)",
            "Frais de dossier pour certaines modifications"
          ]
        }
      ]
    },
    {
      icon: XCircle,
      title: "4. Annulation et modification",
      content: [
        {
          subtitle: "Politique d'annulation standard",
          list: [
            "Annulation gratuite jusqu'à 48 heures avant l'arrivée",
            "Annulation entre 48h et 24h avant l'arrivée : frais de 50% du montant total",
            "Annulation moins de 24h avant l'arrivée ou non-présentation : frais de 100% du montant total"
          ]
        },
        {
          subtitle: "Périodes de haute saison",
          text: "Pendant les périodes de forte affluence (été, festivals, événements spéciaux), des conditions plus strictes peuvent s'appliquer :",
          list: [
            "Annulation gratuite jusqu'à 7 jours avant l'arrivée",
            "Aucun remboursement en cas d'annulation dans les 7 jours précédant l'arrivée"
          ]
        },
        {
          subtitle: "Modification de réservation",
          list: [
            "Les modifications sont soumises à disponibilité",
            "Des frais de modification de 25$ peuvent s'appliquer",
            "Les modifications doivent être demandées au moins 48h avant l'arrivée",
            "Toute modification entraînant une augmentation du tarif nécessitera un paiement supplémentaire"
          ]
        },
        {
          subtitle: "Circonstances exceptionnelles",
          text: "En cas de circonstances exceptionnelles (maladie grave, décès, catastrophe naturelle), nous étudierons les demandes d'annulation au cas par cas. Une preuve documentée peut être demandée."
        }
      ]
    },
    {
      icon: CheckCircle,
      title: "5. Arrivée et départ",
      content: [
        {
          subtitle: "Horaires",
          list: [
            "Enregistrement (check-in) : à partir de 15h00",
            "Départ (check-out) : avant 11h00",
            "Départ tardif possible sur demande et selon disponibilité (des frais peuvent s'appliquer)"
          ]
        },
        {
          subtitle: "Enregistrement anticipé / Départ tardif",
          list: [
            "Enregistrement anticipé (avant 15h) : 50$ (selon disponibilité)",
            "Départ tardif (après 11h, avant 15h) : 50$ (selon disponibilité)",
            "Départ tardif (après 15h) : frais d'une nuit supplémentaire"
          ]
        },
        {
          subtitle: "Documents requis",
          text: "À l'enregistrement, vous devez présenter :",
          list: [
            "Une pièce d'identité avec photo valide",
            "La carte de crédit utilisée pour la réservation",
            "Votre confirmation de réservation"
          ]
        }
      ]
    },
    {
      icon: AlertCircle,
      title: "6. Règlement intérieur",
      content: [
        {
          subtitle: "Comportement des clients",
          text: "Les clients s'engagent à :",
          list: [
            "Respecter les autres clients et le personnel",
            "Ne pas causer de troubles ou nuisances sonores (calme requis de 22h à 7h)",
            "Ne pas fumer dans les chambres (amende de 250$ en cas de non-respect)",
            "Respecter le nombre maximum d'occupants par chambre",
            "Ne pas déplacer le mobilier ou modifier l'aménagement des chambres"
          ]
        },
        {
          subtitle: "Visiteurs",
          text: "Les visiteurs ne sont pas autorisés dans les chambres sans autorisation préalable de la réception. Des frais supplémentaires peuvent s'appliquer."
        },
        {
          subtitle: "Animaux de compagnie",
          list: [
            "Animaux acceptés dans certaines chambres uniquement (supplément de 25$/nuit)",
            "Réservation préalable obligatoire",
            "Les animaux doivent être tenus en laisse dans les espaces communs",
            "Les dommages causés par les animaux seront facturés"
          ]
        },
        {
          subtitle: "Sécurité",
          list: [
            "Gardez votre carte-clé en sécurité",
            "Signalez immédiatement toute perte ou vol",
            "Utilisez le coffre-fort de la chambre pour vos objets de valeur",
            "Respectez les consignes de sécurité et d'évacuation"
          ]
        }
      ]
    },
    {
      icon: Scale,
      title: "7. Responsabilité",
      content: [
        {
          subtitle: "Responsabilité de l'hôtel",
          text: "L'hôtel ne peut être tenu responsable de :",
          list: [
            "La perte, le vol ou les dommages aux objets personnels non déposés au coffre-fort",
            "Les blessures résultant d'une utilisation inappropriée des installations",
            "Les interruptions de services dues à des circonstances indépendantes de notre volonté (pannes, catastrophes naturelles, etc.)",
            "Les désagréments causés par des travaux de maintenance d'urgence"
          ]
        },
        {
          subtitle: "Responsabilité du client",
          text: "Le client est responsable de :",
          list: [
            "Tous les dommages causés à la chambre ou aux installations de l'hôtel",
            "Le comportement de ses invités et visiteurs",
            "Les frais engagés pendant le séjour",
            "Le respect du règlement intérieur"
          ]
        },
        {
          subtitle: "Dommages",
          text: "En cas de dommage à la propriété de l'hôtel, les frais de réparation ou de remplacement seront facturés au client. L'hôtel se réserve le droit de facturer la carte de crédit en dossier."
        }
      ]
    },
    {
      icon: AlertCircle,
      title: "8. Force majeure",
      content: [
        {
          text: "L'hôtel ne peut être tenu responsable de l'inexécution de ses obligations en cas de force majeure, notamment :",
          list: [
            "Catastrophes naturelles (inondations, tempêtes, tremblements de terre)",
            "Incendies",
            "Pannes de courant ou de services publics",
            "Grèves ou conflits sociaux",
            "Actes de terrorisme ou de guerre",
            "Épidémies ou pandémies",
            "Ordres gouvernementaux"
          ]
        },
        {
          subtitle: "Remboursement en cas de force majeure",
          text: "En cas de fermeture de l'hôtel pour cause de force majeure, les clients seront remboursés au prorata des nuits non utilisées."
        }
      ]
    },
    {
      icon: FileText,
      title: "9. Protection des données personnelles",
      content: [
        {
          text: "L'utilisation de vos données personnelles est régie par notre Politique de Confidentialité. En effectuant une réservation, vous acceptez que vos données soient collectées et utilisées conformément à cette politique."
        },
        {
          text: "Pour plus d'informations, consultez notre Politique de Confidentialité complète."
        }
      ]
    },
    {
      icon: Scale,
      title: "10. Droit applicable et juridiction",
      content: [
        {
          subtitle: "Loi applicable",
          text: "Les présentes conditions générales sont régies par les lois de la province de Québec et les lois fédérales du Canada applicables."
        },
        {
          subtitle: "Résolution des litiges",
          text: "En cas de litige :",
          list: [
            "Les parties s'efforceront de résoudre le différend à l'amiable",
            "Si aucun accord n'est trouvé, le litige sera soumis aux tribunaux compétents de la ville de Sept-Îles, Québec"
          ]
        },
        {
          subtitle: "Divisibilité",
          text: "Si une disposition des présentes conditions est jugée invalide ou inapplicable, les autres dispositions resteront en vigueur."
        }
      ]
    },
    {
      icon: Phone,
      title: "11. Contact",
      content: [
        {
          subtitle: "Pour toute question concernant ces conditions",
          text: "Vous pouvez nous contacter :",
          list: [
            "Par téléphone : +1 (418) 962-2581",
            "Par email : info@hotel-sept-iles.ca",
            "Par courrier : 451 Avenue Arnaud, Sept-Îles, QC G4R 3B3, Canada",
            "À la réception : disponible 24h/24, 7j/7"
          ]
        },
        {
          subtitle: "Service client",
          text: "Notre équipe est à votre disposition pour répondre à toutes vos questions concernant nos services, vos réservations ou ces conditions générales."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <FileText className="w-16 h-16" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Conditions Générales d'Utilisation
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Veuillez lire attentivement ces conditions avant d'utiliser nos services. Elles définissent vos droits et obligations lors de votre séjour à l'Hôtel Sept-Îles.
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Dernière mise à jour : {lastUpdate}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-blue-100"
          >
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">
              Bienvenue à l'Hôtel Sept-Îles
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Les présentes Conditions Générales d'Utilisation (ci-après "CGU") régissent l'utilisation du site web de l'Hôtel Sept-Îles ainsi que tous les services proposés par l'établissement.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              En effectuant une réservation ou en utilisant nos services, vous reconnaissez avoir lu, compris et accepté l'intégralité de ces conditions. Ces CGU constituent un contrat légalement contraignant entre vous et l'Hôtel Sept-Îles.
            </p>
          </motion.div>

          {/* Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-neutral-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-display text-2xl font-bold text-neutral-900 flex-1">
                  {section.title}
                </h2>
              </div>

              {section.content.map((item, itemIndex) => (
                <div key={itemIndex} className={itemIndex > 0 ? 'mt-6' : ''}>
                  {item.subtitle && (
                    <h3 className="font-semibold text-lg text-neutral-800 mb-3">
                      {item.subtitle}
                    </h3>
                  )}
                  {item.text && (
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      {item.text}
                    </p>
                  )}
                  {'list' in item && item.list && (
                    <ul className="space-y-2 ml-4">
                      {item.list.map((listItem, listIndex) => (
                        <li key={listIndex} className="flex items-start gap-3">
                          <span className="text-primary-600 mt-1.5">•</span>
                          <span className="text-neutral-700 flex-1">{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </motion.div>
          ))}

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 text-center border border-primary-100"
          >
            <CheckCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">
              Votre satisfaction, notre engagement
            </h3>
            <p className="text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              Ces conditions ont été établies pour garantir un séjour agréable à tous nos clients. Si vous avez des questions ou des préoccupations, notre équipe est à votre disposition pour vous aider.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
