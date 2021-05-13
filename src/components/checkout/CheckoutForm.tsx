import React, { useState } from "react"

import { CardElement, useStripe, useElements, } from "@stripe/react-stripe-js"

import { makeStyles } from "@material-ui/core/styles"
import { Container } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"

import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"
import { TransitionProps } from "@material-ui/core/transitions"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles(() => ({
  container: {
    margin: "5rem 0 3rem",
    textAlign: "center"
  },
  agreeBtn: {
    textTransform: "none"
  },
  submitBtn: {
    textTransform: "none"
  }
}))

interface CompletionDialogProps {
  open: boolean
  title: string
  text: string
  handleClose: VoidFunction
}

const CompletionDialog = ({ open, title, text, handleClose }: CompletionDialogProps) => {
  const classes = useStyles()

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}
            className={classes.agreeBtn}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

interface CheckoutFormProps {
  totalCost: number
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalCost}) => {
  const classes = useStyles()

  const [status, setStatus] = useState<string>("default")
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const stripe = useStripe()
  const elements = useElements()

  // paymentIntents用
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setStatus("submitting")

    try {
      const res = await fetch("/.netlify/functions/paymentIntents", {
        method: "POST",
        body: JSON.stringify({
          amount: totalCost
        }),
        headers: { "Content-Type": "application/json" }
      })

      const data = await res.json()
      const secret = data.client_secret

      const card = elements?.getElement(CardElement) || { "token": ""}

      const result = await stripe?.confirmCardPayment(secret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "Test User"
          }
        }
      })

      if (result?.paymentIntent?.status === "succeeded") {
        setStatus("succeeded")
      } else {
        throw new Error("Network response was not ok.")
      }
    } catch (err) {
      setStatus("failed")
    }

    handleOpen()
  }

  // // charge用
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault()

  //   setStatus("submitting")

  //   try {
  //     const { token } = await stripe.createToken({ name: "TestUser" })

  //     const res = await fetch("/.netlify/functions/charge", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         amount: totalCost,
  //         token: token.id,
  //       })
  //     })

  //     if (res.ok) {
  //       setStatus("succeeded")
  //     } else {
  //       throw new Error("Network response was not ok.")
  //     }
  //   } catch (err) {
  //     setStatus("failed")
  //   }

  //   handleOpen()
  // }

  return (
    <Container className={classes.container}>
      <form onSubmit={handleSubmit}>
        <h4>Would you like to complete the purchase?</h4>
        <CardElement />
        <Button
          type="submit"
          variant="outlined"
          disabled={status === "submitting"}
          startIcon={<KeyboardArrowUpIcon />}
          className={classes.submitBtn}
        >
          {status === "submitting" ? "Submitting" : "Submit"}
        </Button>
      </form>
      <CompletionDialog
        open={open}
        title={status === "succeeded" ? "Succeeded!" : "Failed"}
        text={status === "succeeded" ? "Thank you, your payment was successful!" : "Sorry, something went wrong. Please check your credit card information again."}
        handleClose={handleClose}
      />
    </Container>
  )
}

export default CheckoutForm
