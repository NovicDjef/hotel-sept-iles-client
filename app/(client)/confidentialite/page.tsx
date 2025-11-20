'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Mail, Phone, MapPin } from 'lucide-react'

export default function ConfidentialitePage() {
  const lastUpdate = "15 novembre 2024"

  const sections = [
    {
      icon: Database,
      title: "1. Collecte des informations",
      content: [
        {
          subtitle: "Informations que nous collectons",
          text: "Nous collectons les informations suivantes lorsque vous utilisez notre site web ou nos services :",
          list: [
            "Informations d'identification : nom, prénom, adresse email, numéro de téléphone",
            "Informations de réservation : dates de séjour, type de chambre, préférences",
            "Informations de paiement : détails de carte bancaire (traités de manière sécurisée par nos partenaires de paiement)",
            "Informations de navigation : adresse IP, type de navigateur, pages visitées, durée de visite",
            "Cookies et technologies similaires pour améliorer votre expérience"
          ]
        },
        {
          subtitle: "Comment nous collectons vos informations",
          text: "Nous collectons vos informations de différentes manières :",
          list: [
            "Directement auprès de vous lors de la création d'un compte ou d'une réservation",
            "Automatiquement via les cookies et technologies de suivi",
            "Par le biais de nos partenaires de paiement sécurisés (Stripe)",
            "Lors de vos interactions avec notre service client"
          ]
        }
      ]
    },
    {
      icon: Lock,
      title: "2. Utilisation des informations",
      content: [
        {
          subtitle: "Finalités du traitement",
          text: "Nous utilisons vos informations personnelles pour :",
          list: [
            "Traiter et gérer vos réservations",
            "Vous envoyer des confirmations de réservation et des communications importantes",
            "Améliorer nos services et votre expérience client",
            "Personnaliser votre expérience sur notre site web",
            "Prévenir la fraude et assurer la sécurité de nos services",
            "Respecter nos obligations légales et réglementaires",
            "Vous envoyer des offres promotionnelles (avec votre consentement)"
          ]
        },
        {
          subtitle: "Base légale du traitement",
          text: "Le traitement de vos données repose sur :",
          list: [
            "L'exécution du contrat de réservation",
            "Votre consentement explicite pour certaines utilisations",
            "Nos intérêts légitimes (amélioration de nos services, sécurité)",
            "Le respect de nos obligations légales"
          ]
        }
      ]
    },
    {
      icon: Shield,
      title: "3. Protection et sécurité des données",
      content: [
        {
          subtitle: "Mesures de sécurité",
          text: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données :",
          list: [
            "Chiffrement SSL/TLS pour toutes les transmissions de données",
            "Stockage sécurisé des données sur des serveurs protégés",
            "Contrôle d'accès strict aux données personnelles",
            "Audits de sécurité réguliers",
            "Formation de notre personnel aux bonnes pratiques de sécurité",
            "Surveillance continue des systèmes pour détecter les violations potentielles"
          ]
        },
        {
          subtitle: "Conservation des données",
          text: "Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément aux obligations légales applicables."
        }
      ]
    },
    {
      icon: Eye,
      title: "4. Partage des informations",
      content: [
        {
          subtitle: "Avec qui partageons-nous vos données",
          text: "Nous pouvons partager vos informations avec :",
          list: [
            "Prestataires de services de paiement (Stripe) pour traiter les transactions",
            "Prestataires de services informatiques et d'hébergement",
            "Autorités légales si requis par la loi",
            "Partenaires commerciaux (uniquement avec votre consentement explicite)"
          ]
        },
        {
          subtitle: "Transferts internationaux",
          text: "Vos données peuvent être transférées et stockées dans des pays en dehors du Canada. Dans ce cas, nous nous assurons que des garanties appropriées sont en place pour protéger vos données conformément aux lois canadiennes sur la protection des données."
        }
      ]
    },
    {
      icon: Lock,
      title: "5. Vos droits",
      content: [
        {
          subtitle: "Droits d'accès et de contrôle",
          text: "Conformément aux lois canadiennes sur la protection de la vie privée, vous disposez des droits suivants :",
          list: [
            "Droit d'accès : obtenir une copie de vos données personnelles",
            "Droit de rectification : corriger vos données inexactes ou incomplètes",
            "Droit à l'effacement : demander la suppression de vos données",
            "Droit à la limitation du traitement : restreindre l'utilisation de vos données",
            "Droit à la portabilité : recevoir vos données dans un format structuré",
            "Droit d'opposition : vous opposer au traitement de vos données",
            "Droit de retirer votre consentement à tout moment"
          ]
        },
        {
          subtitle: "Comment exercer vos droits",
          text: "Pour exercer vos droits, contactez-nous à l'adresse : privacy@hotel-sept-iles.ca. Nous répondrons à votre demande dans les 30 jours."
        }
      ]
    },
    {
      icon: Database,
      title: "6. Cookies et technologies de suivi",
      content: [
        {
          subtitle: "Utilisation des cookies",
          text: "Notre site utilise des cookies pour :",
          list: [
            "Mémoriser vos préférences et paramètres",
            "Analyser le trafic et l'utilisation du site",
            "Personnaliser le contenu et les publicités",
            "Améliorer la sécurité du site"
          ]
        },
        {
          subtitle: "Gestion des cookies",
          text: "Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur. Notez que la désactivation de certains cookies peut affecter le fonctionnement du site."
        }
      ]
    },
    {
      icon: Shield,
      title: "7. Protection des mineurs",
      content: [
        {
          text: "Notre site n'est pas destiné aux personnes de moins de 18 ans. Nous ne collectons pas sciemment d'informations personnelles auprès de mineurs. Si nous découvrons qu'un mineur nous a fourni des données personnelles, nous prendrons des mesures pour supprimer ces informations."
        }
      ]
    },
    {
      icon: Mail,
      title: "8. Modifications de la politique",
      content: [
        {
          text: "Nous pouvons modifier cette politique de confidentialité de temps à autre. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour. Nous vous encourageons à consulter régulièrement cette page pour rester informé de la manière dont nous protégeons vos informations."
        }
      ]
    },
    {
      icon: Phone,
      title: "9. Nous contacter",
      content: [
        {
          subtitle: "Pour toute question concernant cette politique",
          text: "Vous pouvez nous contacter aux coordonnées suivantes :",
          list: [
            "Email : privacy@hotel-sept-iles.ca",
            "Téléphone : +1 (418) 962-2581",
            "Adresse : 451 Avenue Arnaud, Sept-Îles, QC G4R 3B3, Canada",
            "Service client disponible du lundi au vendredi, de 9h à 17h"
          ]
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
              <Shield className="w-16 h-16" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Votre vie privée est importante pour nous. Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles.
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
              Introduction
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              L'Hôtel Sept-Îles (ci-après "nous", "notre" ou "l'hôtel") s'engage à protéger et à respecter votre vie privée. Cette politique de confidentialité décrit nos pratiques concernant la collecte, l'utilisation, la divulgation et la protection de vos informations personnelles.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              En utilisant notre site web ou nos services, vous acceptez les pratiques décrites dans cette politique. Si vous n'acceptez pas cette politique, veuillez ne pas utiliser notre site web ou nos services.
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
                  {'subtitle' in item && item.subtitle && (
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
            <Lock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">
              Votre confiance est notre priorité
            </h3>
            <p className="text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              Nous nous engageons à protéger vos données personnelles avec les plus hauts standards de sécurité. Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, n'hésitez pas à nous contacter.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
